/* @flow */
import { Component } from 'react';
import Pagination from '../../../../../library/Pagination';
import Table from '../../../../../library/Table';
import DemoLayout from '../../shared/DemoLayout';

const data = [
  {
    Name: 'Malachite',
    Color: 'various greens',
    Luster: 'adamantine to vitreous',
    CrystalSystem: 'monoclinic',
    CrystalHabit: 'botryoidal, stalactitic, acicular to tabular prismatic'
  },
  {
    Name: 'Fluorite',
    Color: 'colorless',
    Luster: 'vitreous',
    CrystalSystem: 'isometric',
    CrystalHabit: 'coarse, nodular, botryoidal, granular'
  },
  {
    Name: 'Magnetite',
    Color: 'black',
    Luster: 'metallic',
    CrystalSystem: 'isometric',
    CrystalHabit: 'octahedral'
  },
  {
    Name: 'Quartz',
    Color: 'colorless',
    Luster: 'vitreous',
    CrystalSystem: 'trigonal or hexagonal',
    CrystalHabit: '6-sided prism ending in 6-sided pyramid, drusy'
  },
  {
    Name: 'Azurite',
    Color: 'azure-blue',
    Luster: 'vitreous',
    CrystalSystem: 'monoclinic',
    CrystalHabit: 'prismatic, stalactitic'
  },
  {
    Name: 'Hematite',
    Color: 'metallic gray',
    Luster: 'metallic to splendent',
    CrystalSystem: 'trigonal',
    CrystalHabit: 'micaceous or platy, rosettes, oolitic'
  },
  {
    Name: 'Pyrite',
    Color: 'pale brass-yellow reflective',
    Luster: 'metallic, glistening',
    CrystalSystem: 'isometric',
    CrystalHabit: 'cubic, inter-grown, radiated, stalactitic'
  },
  {
    Name: 'Zoisite',
    Color: 'white, various',
    Luster: 'vitreous, pearly on cleavage surfaces',
    CrystalSystem: 'orthorhombic',
    CrystalHabit: 'prismatic with striations'
  },
  {
    Name: 'Selenite',
    Color: 'brown green, various',
    Luster: 'pearly',
    CrystalSystem: 'monoclinic',
    CrystalHabit: 'earthy, no visible crystalline affinities'
  },
  {
    Name: 'Howlite',
    Color: 'white, colorless',
    Luster: 'subvitreous, glimmering',
    CrystalSystem: 'monoclinic',
    CrystalHabit: 'massive to nodular'
  },
  {
    Name: 'Tourmaline',
    Color: 'black, various',
    Luster: 'vitreous, sometimes resinous',
    CrystalSystem: 'trigonal',
    CrystalHabit: 'parallel and elongated; acicular prisms'
  },
  {
    Name: 'Celestite',
    Color: 'colorless, various',
    Luster: 'vitreous, pearly on cleavages',
    CrystalSystem: 'orthorhombic',
    CrystalHabit: 'tabular to pyramidal, fibrous, lamellar, earthy'
  },
  {
    Name: 'Vanadinite',
    Color: 'bright red, various',
    Luster: 'resinous to sub-adamantine',
    CrystalSystem: 'hexagonal',
    CrystalHabit: 'prismatic or nodular; acicular, hairlike, fibrous'
  },
  {
    Name: 'Argonite',
    Color: 'white, various',
    Luster: 'vitreous, resinous on fracture surfaces',
    CrystalSystem: 'orthorhombic',
    CrystalHabit: 'pseudohexagonal, prismatic, acicular, columnar'
  }
];

const columns = [
  { content: 'Mineral', key: 'Name' },
  { content: 'Color', key: 'Color' },
  { content: 'Luster', key: 'Luster' },
  { content: 'Crystal System', key: 'CrystalSystem' },
  { content: 'Crystal Habit', key: 'CrystalHabit' }
];

export default {
  id: 'table-sortable',
  title: 'Sortable Table',
  description: `TODO`,
  hideFromProd: true,
  scope: { Component, columns, data, DemoLayout, Pagination, Table },
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

          this.handleSort = this.handleSort.bind(this);
          this.onPageChange = this.onPageChange.bind(this);
        }

        handleSort(sort) {
          this.setState({ data: data });
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
                sortable
                onSort={this.handleSort}
                data={slicedData}
                columns={columns}
                title="Minerals"
                hideTitle
                rowKey="Name" />
              <Pagination
                onPageChange={this.onPageChange}
                pageSize={pageSize}
                totalLength={data.length} />
            </DemoLayout>
          )
        }
      }

      return <PaginatedTable data={data}/>
    }
  `
};
