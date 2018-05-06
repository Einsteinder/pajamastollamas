import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid,Label} from 'semantic-ui-react'

export default class ElasticSearch extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.name })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.name)

      this.setState({
        isLoading: false,
        results: _.filter(this.props.products, isMatch),
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state
    const resultRenderer = ({ name,price }) => <Label> {name}  <Label.Detail>{price}</Label.Detail></Label>

    return (
      <Grid>
        <Grid.Column width={4}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            results={results}
            value={value}
            resultRenderer={resultRenderer}
            {...this.props}
          />
        </Grid.Column>

      </Grid>
    )
  }
}



