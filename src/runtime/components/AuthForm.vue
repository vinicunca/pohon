<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ButtonProps, CheckboxProps, FormFieldProps, FormProps, IconProps, InputProps, LinkPropsKeys, PinInputProps, SelectMenuProps, SeparatorProps } from '../types';
import type { FormSchema, FormSubmitEvent, InferInput } from '../types/form';
import type { FormHTMLAttributes } from '../types/html';
import type { NonUnion } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/ui/auth-form';

type AuthForm = ComponentConfig<typeof theme, AppConfig, 'authForm'>;

export type AuthFormCheckboxField = Omit<FormFieldProps, 'name'> & CheckboxProps & {
  name: string;
  type: 'checkbox';
};

export type AuthFormSelectField = Omit<FormFieldProps, 'name'> & SelectMenuProps & {
  name: string;
  type: 'select';
};

export type AuthFormOtpField = Omit<FormFieldProps, 'name'> & Omit<PinInputProps, 'type' | 'otp'> & {
  name: string;
  type: 'otp';
  /**
   * @deprecated Bind props directly in the field object.
   * The optional props for the `otp` type.
   * `{ otp: true }`{lang="ts-type"}
   */
  otp?: boolean | PinInputProps;
};

export type AuthFormInputFieldType = Required<InputProps>['type'];

export type AuthFormInputField<T extends AuthFormInputFieldType & NonUnion<T> = 'text'> = Omit<FormFieldProps, 'name'> & Omit<InputProps, 'type'> & {
  name: string;
  type: T;
};

export type AuthFormField = AuthFormCheckboxField | AuthFormSelectField | AuthFormOtpField | AuthFormInputField<AuthFormInputFieldType>;

export interface AuthFormProps<T extends FormSchema = FormSchema<object>, F extends AuthFormField = AuthFormField> extends /** @vue-ignore */ FormHTMLAttributes {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * The icon displayed above the title.
   * @IconifyIcon
   */
  icon?: IconProps['name'];
  title?: string;
  description?: string;
  fields?: Array<F>;
  /**
   * Display a list of Button under the description.
   * `{ color: 'neutral', variant: 'subtle', block: true }`{lang="ts-type"}
   */
  providers?: Array<ButtonProps>;
  /**
   * The text displayed in the separator.
   * @defaultValue 'or'
   */
  separator?: string | SeparatorProps;
  /**
   * Display a submit button at the bottom of the form.
   * `{ label: 'Continue', block: true }`{lang="ts-type"}
   */
  submit?: Omit<ButtonProps, LinkPropsKeys>;
  schema?: T;
  validate?: FormProps<T>['validate'];
  validateOn?: FormProps<T>['validateOn'];
  validateOnInputDelay?: FormProps<T>['validateOnInputDelay'];
  disabled?: FormProps<T>['disabled'];
  loading?: ButtonProps['loading'];
  loadingAuto?: FormProps<T>['loadingAuto'];
  class?: any;
  onSubmit?: FormProps<T>['onSubmit'];
  ui?: AuthForm['slots'];
}

export type AuthFormEmits<T extends object> = {
  submit: [payload: FormSubmitEvent<T>];
};

type DynamicFieldSlots<T, F, SlotProps = { field: F; state: T }> = Record<`${keyof T extends string ? keyof T : never}-field` | (string & {}), (props: SlotProps) => Array<VNode>>;

type DynamicFormFieldSlots<T> = Record<`${keyof T extends string ? keyof T : never}-${'label' | 'description' | 'hint' | 'help' | 'error'}` | (string & {}), (props?: {}) => Array<VNode>>;

export type AuthFormSlots<T extends object = object, F extends AuthFormField = AuthFormField> = {
  header?(props?: {}): Array<VNode>;
  leading?(props: { ui: AuthForm['ui'] }): Array<VNode>;
  title?(props?: {}): Array<VNode>;
  description?(props?: {}): Array<VNode>;
  providers?(props?: {}): Array<VNode>;
  separator?(props?: {}): Array<VNode>;
  validation?(props?: {}): Array<VNode>;
  submit?(props: { loading: boolean }): Array<VNode>;
  footer?(props?: {}): Array<VNode>;
} & DynamicFieldSlots<T, F> & DynamicFormFieldSlots<T>;

</script>

<script setup lang="ts" generic="T extends FormSchema, F extends AuthFormField">
import { Primitive } from 'akar';
import { computed, reactive, shallowReactive, useTemplateRef } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { useLocale } from '../composables/useLocale';
import { omit, pick } from '../utils';
import { uv } from '../utils/uv';
import PButton from './Button.vue';
import PCheckbox from './Checkbox.vue';
import PForm from './Form.vue';
import PFormField from './FormField.vue';
import PIcon from './Icon.vue';
import PInput from './Input.vue';
import PPinInput from './PinInput.vue';
import PSelectMenu from './SelectMenu.vue';
import PSeparator from './Separator.vue';

defineOptions({ inheritAttrs: false });

const _props = withDefaults(
  defineProps<AuthFormProps<T, F>>(),
  {
    separator: 'or',
  },
);

defineEmits<AuthFormEmits<typeof state>>();

const slots = defineSlots<AuthFormSlots<typeof state, F>>();

type FormStateType = InferInput<T>;

type TypedAuthFormField = AuthFormField & {
  name: keyof FormStateType;
  defaultValue?: FormStateType[keyof FormStateType];
};

const state = reactive<FormStateType>((_props.fields as Array<TypedAuthFormField> || []).reduce<FormStateType>((acc, field) => {
  if (field.name) {
    acc[field.name] = field.defaultValue;
  }
  return acc;
}, {} as FormStateType));

const props = useComponentProps<AuthFormProps<T, F>>('authForm', _props);

const { t } = useLocale();
const appConfig = useAppConfig() as AuthForm['AppConfig'];

const ui = computed(() => uv({ extend: uv(theme), ...(appConfig.ui?.authForm || {}) })());

const formRef = useTemplateRef('formRef');

const passwordVisibility = reactive<Record<string, boolean>>(
  (_props.fields as Array<TypedAuthFormField> || []).reduce<Record<string, boolean>>((acc, field) => {
    if (field.type === 'password' && field.name) {
      acc[field.name as string] = false;
    }
    return acc;
  }, {}),
);
const passwordRefs = shallowReactive<Record<string, { inputRef?: HTMLInputElement | null } | null>>({});

function pickFieldProps(field: F) {
  const fields = ['name', 'errorPattern', 'help', 'error', 'hint', 'size', 'required', 'eagerValidation', 'validateOnInputDelay'] as Array<keyof F>;

  // Prevent binding `label` and `description` on Checkbox's FormField
  if (field.type === 'checkbox') {
    return pick(field, fields);
  }

  return pick(field, [...fields, 'label', 'description']);
}

function omitFieldProps(field: F) {
  const fields = ['errorPattern', 'help', 'error', 'hint', 'size', 'required', 'eagerValidation', 'validateOnInputDelay'] as Array<keyof F>;

  // Prevent binding `type` on other fields than Input
  if (field.type === 'checkbox' || field.type === 'select' || field.type === 'otp') {
    // Prevent binding `label` and `description` on Checkbox's FormField
    if (field.type === 'checkbox') {
      return omit(field, [...fields, 'type']);
    }

    return omit(field, [...fields, 'type', 'label', 'description']);
  }

  return omit(field, [...fields, 'label', 'description']);
}

defineExpose({
  formRef,
  state,
});
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div v-if="(props.icon || !!slots.leading) || (props.title || !!slots.title) || (props.description || !!slots.description) || !!slots.header" data-slot="header" :class="ui.header({ class: props.ui?.header })">
      <slot name="header">
        <div v-if="props.icon || !!slots.leading" data-slot="leading" :class="ui.leading({ class: props.ui?.leading })">
          <slot name="leading" :ui="ui">
            <PIcon v-if="props.icon" :name="props.icon" data-slot="leadingIcon" :class="ui.leadingIcon({ class: props.ui?.leadingIcon })" />
          </slot>
        </div>

        <div v-if="props.title || !!slots.title" data-slot="title" :class="ui.title({ class: props.ui?.title })">
          <slot name="title">
            {{ props.title }}
          </slot>
        </div>

        <div v-if="props.description || !!slots.description" data-slot="description" :class="ui.description({ class: props.ui?.description })">
          <slot name="description">
            {{ props.description }}
          </slot>
        </div>
      </slot>
    </div>

    <div data-slot="body" :class="ui.body({ class: props.ui?.body })">
      <div v-if="props.providers?.length || !!slots.providers" data-slot="providers" :class="ui.providers({ class: props.ui?.providers })">
        <slot name="providers">
          <PButton
            v-for="(provider, index) in props.providers"
            :key="index"
            block
            color="neutral"
            variant="subtle"
            v-bind="provider"
          />
        </slot>
      </div>

      <slot name="separator">
        <PSeparator
          v-if="props.providers?.length && props.fields?.length"
          v-bind="typeof props.separator === 'object' ? props.separator : { label: props.separator }"
          data-slot="separator"
          :class="ui.separator({ class: props.ui?.separator })"
        />
      </slot>

      <PForm
        v-if="props.fields?.length"
        ref="formRef"
        :state="state"
        :schema="props.schema"
        :validate="props.validate"
        :validate-on="props.validateOn"
        :disabled="props.disabled"
        :loading-auto="props.loadingAuto"
        data-slot="form"
        :class="ui.form({ class: props.ui?.form })"
        v-bind="$attrs"
        @submit="props.onSubmit"
      >
        <PFormField
          v-for="field in props.fields"
          :key="field.name"
          v-bind="pickFieldProps(field)"
        >
          <slot :name="`${field.name}-field`" v-bind="{ state, field }">
            <PCheckbox
              v-if="field.type === 'checkbox'"
              v-model="state[field.name]"
              data-slot="checkbox"
              :class="ui.checkbox({ class: props.ui?.checkbox })"
              v-bind="(omitFieldProps(field))"
            />
            <PSelectMenu
              v-else-if="field.type === 'select'"
              v-model="state[field.name]"
              data-slot="select"
              :class="ui.select({ class: props.ui?.select })"
              v-bind="(omitFieldProps(field) as AuthFormSelectField)"
            />
            <PPinInput
              v-else-if="field.type === 'otp'"
              :id="field.name"
              v-model="state[field.name]"
              data-slot="otp"
              :class="ui.otp({ class: props.ui?.otp })"
              v-bind="(Object.assign({}, omitFieldProps(field), typeof (field as AuthFormOtpField).otp === 'object' ? (field as AuthFormOtpField).otp : {}) as any)"
              otp
            />
            <PInput
              v-else-if="field.type === 'password'"
              :ref="(el: any) => { passwordRefs[field.name] = el }"
              v-model="state[field.name]"
              data-slot="password"
              :class="ui.password({ class: props.ui?.password })"
              v-bind="(omitFieldProps(field) as AuthFormInputField<'password'>)"
              :type="passwordVisibility[field.name] ? 'text' : 'password'"
            >
              <template #trailing>
                <PButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="passwordVisibility[field.name] ? appConfig.ui.icons.eyeOff : appConfig.ui.icons.eye"
                  :aria-label="passwordVisibility[field.name] ? t('authForm.hidePassword') : t('authForm.showPassword')"
                  :aria-pressed="!!passwordVisibility[field.name]"
                  :aria-controls="passwordRefs[field.name]?.inputRef?.id"
                  @click="passwordVisibility[field.name] = !passwordVisibility[field.name]"
                />
              </template>
            </PInput>
            <PInput
              v-else
              v-model="state[field.name]"
              data-slot="input"
              :class="ui.input({ class: props.ui?.input })"
              v-bind="(omitFieldProps(field) as AuthFormInputField)"
            />
          </slot>

          <template v-if="!!slots[`${field.name}-label`]" #label>
            <slot :name="`${field.name}-label`" />
          </template>
          <template v-if="!!slots[`${field.name}-description`]" #description>
            <slot :name="`${field.name}-description`" />
          </template>
          <template v-if="!!slots[`${field.name}-hint`]" #hint>
            <slot :name="`${field.name}-hint`" />
          </template>
          <template v-if="!!slots[`${field.name}-help`]" #help>
            <slot :name="`${field.name}-help`" />
          </template>
          <template v-if="!!slots[`${field.name}-error`]" #error>
            <slot :name="`${field.name}-error`" />
          </template>
        </PFormField>

        <slot v-if="!!slots.validation" name="validation" />

        <slot name="submit" :loading="props.loading">
          <PButton
            type="submit"
            :label="t('authForm.submit')"
            block
            :loading="props.loading"
            :loading-auto="props.loadingAuto"
            v-bind="props.submit"
          />
        </slot>
      </PForm>
    </div>

    <div v-if="!!slots.footer" data-slot="footer" :class="ui.footer({ class: props.ui?.footer })">
      <slot name="footer" />
    </div>
  </Primitive>
</template>
