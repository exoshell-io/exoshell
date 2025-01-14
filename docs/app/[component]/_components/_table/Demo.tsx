import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
} from '@exoshell/ui';

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

export const Demo: React.FC = () => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableColumn isRowHeader>Position</TableColumn>
          <TableColumn>Mass</TableColumn>
          <TableColumn>Symbol</TableColumn>
          <TableColumn>Name</TableColumn>
        </TableHeader>
        <TableBody>
          {elements.map((element) => (
            <TableRow key={element.position}>
              <TableCell>{element.position}</TableCell>
              <TableCell>{element.mass}</TableCell>
              <TableCell>{element.symbol}</TableCell>
              <TableCell>{element.name}</TableCell>
            </TableRow>
          ))}
          <TableFooter>
            <TableCell>Total</TableCell>
            <TableCell />
            <TableCell />
            <TableCell className='text-right'>$2,500.00</TableCell>
          </TableFooter>
        </TableBody>
      </Table>
    </>
  );
};
