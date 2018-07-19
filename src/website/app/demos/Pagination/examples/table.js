/* @flow */
import { Component } from 'react';
import Pagination from '../../../../../library/Pagination';
import Table from '../../../../../library/Table';
import DemoLayout from '../../shared/DemoLayout';

const data = [
  {
    Fruits: 'Pomello',
    Vegetables: 'Bok Choi',
    Grains: 'Chia',
    Dairy: 'Pule',
    Protein: 'Crickets'
  },
  {
    Fruits: 'Starfruit',
    Vegetables: 'Romanesco',
    Grains: 'Sorghum',
    Dairy: 'Casu marzu',
    Protein: 'Barnacles'
  },
  {
    Fruits: 'Durian',
    Vegetables: 'Ramps',
    Grains: 'Teff',
    Dairy: 'Vieux Lille',
    Protein: 'Inca nuts'
  },
  {
    Fruits: 'Persimmons',
    Vegetables: 'Fiddleheads',
    Grains: 'Quinoa',
    Dairy: 'Milbenkase',
    Protein: 'Spirulina'
  },
  {
    Fruits: 'Persimmons',
    Vegetables: 'Fiddleheads',
    Grains: 'Quinoa',
    Dairy: 'Milbenkase',
    Protein: 'Spirulina'
  },
  {
    Fruits: 'Persimmons',
    Vegetables: 'Fiddleheads',
    Grains: 'Quinoa',
    Dairy: 'Milbenkase',
    Protein: 'Spirulina'
  },
  {
    Fruits: 'Persimmons',
    Vegetables: 'Fiddleheads',
    Grains: 'Quinoa',
    Dairy: 'Milbenkase',
    Protein: 'Spirulina'
  },
  {
    Fruits: 'Persimmons',
    Vegetables: 'Fiddleheads',
    Grains: 'Quinoa',
    Dairy: 'Milbenkase',
    Protein: 'Spirulina'
  },
  {
    Fruits: 'Persimmons',
    Vegetables: 'Fiddleheads',
    Grains: 'Quinoa',
    Dairy: 'Milbenkase',
    Protein: 'Spirulina'
  }
];

export default {
  id: 'table',
  title: 'Table',
  description: `TODO`,
  scope: { Component, data, DemoLayout, Pagination, Table },
  source: `
    () => {
      const pageSize = 3

      class PaginatedTable extends Component {
        constructor(props) {
          super(props);

          this.state = {
            data,
            currentPage: 0,
            pageSize: pageSize,
          };

          this.onPageChange = this.onPageChange.bind(this);
        }

        onPageChange(event, page) {
          this.setState({ page })
        }

        render () {
          const { currentPage, data: stateData, pageSize } = this.state
          const slicedData = stateData.slice(currentPage * pageSize, currentPage * pageSize + pageSize)
          return (
            <DemoLayout>
              <Table data={slicedData} title="Foods of the World" hideTitle />
              <Pagination onPageChange={this.onPageChange} pageSize={pageSize} totalPages={data.length / pageSize} />
            </DemoLayout>
          )
        }
      }

      return <PaginatedTable />
    }
  `
};
