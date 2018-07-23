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

const pagesStatus = (firstRow, lastRow, totalRows, rowsText) =>
  `${firstRow} - ${lastRow} of ${totalRows} ${rowsText}`;

export default {
  id: 'page-sizer',
  title: 'Page Sizer',
  description: `TODO`,
  scope: { Component, data, DemoLayout, Pagination, pagesStatus, Table },
  source: `
    () => {
      const pageSizes = [2,3,4]

      class PaginatedTable extends Component {
        constructor(props) {
          super(props);

          this.state = {
            data: this.props.data,
            currentPage: 0,
            pageSize: pageSizes[0]
          };

          this.onPageChange = this.onPageChange.bind(this);
          this.onPageSizeChange = this.onPageSizeChange.bind(this);
        }

        onPageChange(currentPage) {
          this.setState({ currentPage })
        }

        onPageSizeChange(pageSize) {
          this.setState({ pageSize })
        }

        render () {
          const { currentPage, data, pageSize } = this.state
          const firstRow = currentPage * pageSize
          const lastRow = currentPage * pageSize + pageSize
          const slicedData = data.slice(firstRow, lastRow)
          const totalPages = Math.ceil(data.length / pageSize)

          const messages = {pagesStatus: pagesStatus, pageSizerText: 'foods'}

          return (
            <DemoLayout>
              <Table
                data={slicedData}
                title="Foods of the World"
                hideTitle
                rowKey="Fruits" />
              <Pagination
                pageSizer
                pageSizes={pageSizes}
                onPageSizeChange={this.onPageSizeChange}
                messages={messages} totalPages={totalPages}
                onPageChange={this.onPageChange} />
            </DemoLayout>
          )
        }
      }

      return <PaginatedTable data={data}/>
    }
  `
};
