import renderer from 'react-test-renderer'
import IndexPage from '.'

describe('Index page', () => {
    it('should match the snapshot', () => {
    const launch = {
      timestamp: 1605451340000,
      mission: 'Mission Name',
      site: 'Kennedy Space Center',
      rocket: 'Falcon 9',
    }
    const tree = renderer.create(<IndexPage />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
