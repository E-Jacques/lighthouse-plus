# Ligthhouse plus

Thanks to an intuitive and easy-to-use CLI tool, Lighthouse plus allows you to easily check for accessibilty, performance and seo issues inside your app - no matter how complex it is.

## Installation

Simply install using your node package manager of choice:

```bash
npm install -g lighthouse-plus
```

## How to start ?

Create a `lighthouse-plus.yaml` file at the root of your application. This file will hold any most of the configuration and specification to run the desired analysis. Here is a template :

```yaml
check_for:
  - performance
  - accessibility
  - seo
before_each:
  at: https://example.org/login
  act:
    - on: "#username"
      do: "type"
      value: "user123"
    - on: "#password"
      do: "type"
      value: "passwd"
    - on: "#submit"
      do: "click"
analysis:
  dashboard-page:
    at: "https://example.org/dashboard"
    setup:
      - on: "#active-all"
        do: "click"
```

The example above will log a user on the `https://example.org/login` page using the `user123/passwd` credentials. It will them go to `https://example.org/dashboard`, click on the element associated with the `#active-all` selector and run a performance, an accessibility and a seo analysis.

## API Reference

### CLI Parameters

| Argument       | Alias | Details                                                                                                       | Value type | Default                  |
| -------------- | ----- | ------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------ |
| `headless`     | `h`   | Allow the browser to start as _headless_. This requires for the machine to have the appropriate configuration | `boolean`  | `true`                   |
| `output`       | `o`   | The target output directory                                                                                   | `string`   | `lighthouse`             |
| `chromium-bin` | `c`   | A reference to the chrome executable to use to execute Ligthhouse.                                            | `string`   | Use system configuration |
| `config-file`  | `f`   | The path to the configuration file                                                                            | `string`   | `ligthhouse.yaml`        |

### Ligthhouse plus configuration file format

| Property      | Details                                                         | Value type                                             | Required | Default |
| ------------- | --------------------------------------------------------------- | ------------------------------------------------------ | -------- | ------- |
| `check_for`   | The list of the analysis type to run.                           | `performance`\|`accessibility`\|`seo`\|`best-pratices` | No       | All     |
| `before_all`  | The process to execute at the very start of the process         | [`LifecycleHooks`](#lifecycle-hooks-reference)         | No       |         |
| `before_each` | The process to execute before each analysis                     | [`LifecycleHooks`](#lifecycle-hooks-reference)         | No       |         |
| `after_all`   | The process to execute at the very end of the process           | [`LifecycleHooks`](#lifecycle-hooks-reference)         | No       |         |
| `after_each`  | The process to execute after each analysis                      | [`LifecycleHooks`](#lifecycle-hooks-reference)         | No       |         |
| `analysis`    | The analysis configuration with the list of elements to analyse | `Map<String,`[`Analysis`](#analysis-reference)`>`      | Yes      |         |

#### Lifecycle hooks reference

| Property | Details                                                                                          | Value type                        | Required | Default |
| -------- | ------------------------------------------------------------------------------------------------ | --------------------------------- | -------- | ------- |
| `at`     | The URL from where to execute the different actions. If same as current URL, the page may reload | `string`                          | Yes      |         |
| `act`    | A list of action that needs to be performed.                                                     | [`Action`](#action-reference)`[]` | Yes      |         |

#### Analysis reference

| Property    | Details                                                                                          | Value type                        | Required | Default |
| ----------- | ------------------------------------------------------------------------------------------------ | --------------------------------- | -------- | ------- |
| `at`        | The URL from where to execute the different actions. If same as current URL, the page may reload | `string`                          | Yes      |         |
| `setup`     | Extras actions to perform before running the analysis                                            | [`Action`](#action-reference)`[]` | No       |         |
| `tearsdown` | Extras actions to perform before executing the next analysis                                     | [`Action`](#action-reference)`[]` | No       |         |

#### Action reference

| Property | Details                                                                          | Value type        | Required | Default |
| -------- | -------------------------------------------------------------------------------- | ----------------- | -------- | ------- |
| `on`     | The selector associated with the target element                                  | `string`          | Yes      |         |
| `do`     | The action to perform                                                            | `click` \| `type` | Yes      |         |
| `value`  | The value to enter when using the `type` action. Ignore for the `click` actions. | `string`          | No       | `''`    |
