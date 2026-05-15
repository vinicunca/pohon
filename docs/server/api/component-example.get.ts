import { capitalize, toCamelCase } from '@vinicunca/perkakas';
import { appendHeader, createError, defineEventHandler } from 'h3';
// @ts-expect-error - no types available
import { getComponentExample } from '#component-example/nitro';

export default defineEventHandler((event) => {
  appendHeader(event, 'Access-Control-Allow-Origin', '*');
  const componentName = (event.context.params?.['component?'] || '').replace(/\.json$/, '');
  if (componentName) {
    const component = getComponentExample(capitalize(toCamelCase(componentName)));
    if (!component) {
      throw createError({
        statusMessage: 'Example not found!',
        statusCode: 404,
      });
    }
    return component;
  }
});
