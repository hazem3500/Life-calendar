import LabelWithArrow from './LabelWithArrow'

export default {
  title: 'component/LabelWithArrow',
  component: LabelWithArrow,
  args: {
    children: 'Label',
  },
}

export const labelWithArrow = (args) => <LabelWithArrow {...args} />
