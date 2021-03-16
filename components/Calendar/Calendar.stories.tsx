import Calendar from './Calendar'

export default {
  title: 'component/Calendar',
  component: Calendar,
  args: {
    totalWeeks: 1000,
    livedWeeks: 200,
  },
  parameters: {
    layout: 'centered'
  }
}

export const calendar = (args) => <Calendar {...args} />
