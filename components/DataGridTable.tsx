import React from 'react'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

interface DataGridTableProps{
  rows:GridRowsProp;
  columns:GridColDef[];
  onRowSelectionChange:(selectedRow:string | null)=> void;
}

const DataGridTable = ({rows,columns,onRowSelectionChange}:DataGridTableProps) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
    <DataGrid
      rows={rows}
      columns={columns}
      onRowSelectionModelChange={(newSelection: any) => {
        onRowSelectionChange(newSelection[0] ? newSelection[0].toString() : null);
      }}
    />
  </div>
  )
}

export default DataGridTable