import React, { useEffect } from 'react';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css';
import 'datatables.net-fixedcolumns-bs5/css/fixedColumns.bootstrap5.min.css';
import 'datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css';

const $ = require('jquery');
require('datatables.net-bs5');
require('datatables.net-buttons');
require('datatables.net-buttons/js/buttons.colVis.min.js');
require('datatables.net-buttons/js/buttons.flash.min.js');
require('datatables.net-buttons/js/buttons.html5.min.js');
require('datatables.net-buttons/js/buttons.print.min.js');
require('datatables.net-responsive');
require('datatables.net-responsive-bs5');
require('datatables.net-fixedcolumns');
require('datatables.net-fixedcolumns-bs5');

function TablePlugins({ data, columns, config, tableId, customStyles }) {
  useEffect(() => {
    const tableConfig = {
      dom: "<'row mb-3'<'col-md-8 text-end'<'d-lg-flex gap-3 g-3 justify-content-start'f<'d-lg-block d-none'B>>>>t<'row align-items-center'<'mr-auto col-md-6 mb-3 mb-md-0 mt-n2 'i><'mb-0 col-md-6'p>>",
      lengthChange: false,
      responsive: true,
      searching: false,
      paging: false,
      info: false,
      buttons: [
        { extend: 'print', className: 'btn btn-outline-default btn-sm ms-2' },
        { extend: 'csv', className: 'btn btn-outline-default btn-sm ml-3' }
      ],
      ...config,
    };

    const table = $(`#${tableId}`).DataTable(tableConfig);

    return function cleanup() {
      table?.destroy(true);
    };

  }, [data, columns, config, tableId]);

  return (
    <div>
      <table id={tableId} style={customStyles} className="table text-nowrap w-100">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {column.data === null
                    ? column.render(null, null, row)
                    : row[column.data]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablePlugins;
