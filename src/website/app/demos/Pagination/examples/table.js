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
    Fruits: 'A',
    Vegetables: 'Fiddleheads',
    Grains: 'Quinoa',
    Dairy: 'Milbenkase',
    Protein: 'Spirulina'
  },
  {
    Fruits: 'B',
    Vegetables: 'Fiddleheads',
    Grains: 'Quinoa',
    Dairy: 'Milbenkase',
    Protein: 'Spirulina'
  },
  {
    Fruits: 'C',
    Vegetables: 'Fiddleheads',
    Grains: 'Quinoa',
    Dairy: 'Milbenkase',
    Protein: 'Spirulina'
  },
  {
    Fruits: 'D',
    Vegetables: 'Fiddleheads',
    Grains: 'Quinoa',
    Dairy: 'Milbenkase',
    Protein: 'Spirulina'
  },
  {
    Fruits: 'E',
    Vegetables: 'Fiddleheads',
    Grains: 'Quinoa',
    Dairy: 'Milbenkase',
    Protein: 'Spirulina'
  },
  {
    Fruits: 'F',
    Vegetables: 'Fiddleheads',
    Grains: 'Quinoa',
    Dairy: 'Milbenkase',
    Protein: 'Spirulina'
  },
  {
    Fruits: 'G',
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
            data: this.props.data,
            currentPage: 0,
          };

          this.onPageChange = this.onPageChange.bind(this);
        }

        onPageChange(currentPage) {
          this.setState({ currentPage })
        }

        render () {
          const { currentPage, data } = this.state
          const firstRow = currentPage * pageSize
          const lastRow = currentPage * pageSize + pageSize
          const slicedData = data.slice(firstRow, lastRow)
          const totalPages = Math.ceil(data.length / pageSize)

          return (
            <DemoLayout>
              <Table 
                data={slicedData}
                title="Foods of the World"
                hideTitle
                rowKey="Fruits" />
              <Pagination
                onPageChange={this.onPageChange}
                pageSize={pageSize}
                totalPages={totalPages} />
            </DemoLayout>
          )
        }
      }

      return <PaginatedTable data={data}/>
    }
  `
};
