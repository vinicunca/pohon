<script setup lang="ts">
import type { PropertyMeta } from 'vue-component-meta';
import { kebabCase } from 'scule';

const props = defineProps<{
  prop: PropertyMeta;
  ignore?: Array<string>;
}>();

const route = useRoute();

function getSchemaProps(schema: PropertyMeta['schema']): any {
  if (!schema || typeof schema === 'string' || !schema.schema) {
    return [];
  }

  if (schema.kind === 'object') {
    return Object.values(schema.schema).filter((prop) => !props.ignore?.includes(prop.name));
  }

  return (Array.isArray(schema.schema) ? schema.schema : Object.values(schema.schema)).flatMap(getSchemaProps as any);
}

const schemaProps = computed(() => {
  const propsObject = getSchemaProps(props.prop.schema).reduce((acc: any, prop: any) => {
    if (!acc[prop.name]) {
      const defaultValue = prop.default ?? prop.tags?.find((tag: any) => tag.name === 'defaultValue')?.text;
      let description = prop.description;
      if (defaultValue) {
        description = description ? `${description} Defaults to \`${defaultValue}\`{lang="ts-type"}.` : `Defaults to \`${defaultValue}\`{lang="ts-type"}.`;
      }

      acc[prop.name] = {
        ...prop,
        description,
      };
    }

    return acc;
  }, {});

  return Object.values(propsObject) as Array<PropertyMeta>;
});
</script>

<template>
  <ProseCollapsible
    v-if="schemaProps?.length"
    :unmount-on-hide="true"
    class="mb-0 mt-1"
  >
    <ProseUl>
      <ProseLi
        v-for="schemaProp in schemaProps"
        :key="schemaProp.name"
      >
        <HighlightInlineType :type="`${schemaProp.name}${schemaProp.required === false ? '?' : ''}: ${schemaProp.type}`" />

        <MDC
          v-if="schemaProp.description"
          :value="schemaProp.description"
          class="text-muted my-1"
          :cache-key="`${kebabCase(route.path)}-${prop.name}-${schemaProp.name}-description`"
        />
      </ProseLi>
    </ProseUl>
  </ProseCollapsible>
</template>
