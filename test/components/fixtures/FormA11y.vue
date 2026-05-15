<template>
  <PForm>
    <PFormField
      id="emailField"
      name="email"
      label="Email"
    >
      <PInput id="email" />
    </PFormField>
    <PFormField
      id="passwordField"
      name="password"
      label="Password"
    >
      <PInput id="password" />
    </PFormField>

    <PForm
      name="nested"
      nested
    >
      <PFormField
        id="nestedField"
        name="field"
        label="Nested Field"
      >
        <PInput id="nested" />
      </PFormField>
    </PForm>
  </PForm>
</template>
