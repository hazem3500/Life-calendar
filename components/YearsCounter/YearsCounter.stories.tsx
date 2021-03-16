import YearsCounter from './YearsCounter'

export default {
  title: 'component/YearsCounter',
  component: YearsCounter,
  args: {
    yearsLived: 90,
  },
}

export const yearsCounter = (args) => <YearsCounter {...args} />
