import React, { useState } from 'react';
import { Plus, Trash2, Search, RefreshCw, Repeat } from 'lucide-react';
import use2DArrayStore from '../../../store/array2DStore';

const Array2DControls = () => {
  const { 
    matrix,
    insertRow, 
    insertColumn, 
    deleteRow, 
    deleteColumn, 
    updateCell, 
    searchValue, 
    transpose,
    setHighlightedCells 
  } = use2DArrayStore();
  
  const [value, setValue] = useState('');
  const [rowIndex, setRowIndex] = useState('');
  const [colIndex, setColIndex] = useState('');

  const handleInsertRow = () => {
    if (rowIndex === '') return;
    const newRow = Array(matrix[0]?.length || 4).fill(0);
    insertRow(parseInt(rowIndex), newRow);
    setRowIndex('');
    setHighlightedCells([]);
  };

  const handleInsertColumn = () => {
    if (colIndex === '') return;
    insertColumn(parseInt(colIndex), 0);
    setColIndex('');
    setHighlightedCells([]);
  };

  const handleDeleteRow = () => {
    if (rowIndex === '') return;
    deleteRow(parseInt(rowIndex));
    setRowIndex('');
    setHighlightedCells([]);
  };

  const handleDeleteColumn = () => {
    if (colIndex === '') return;
    deleteColumn(parseInt(colIndex));
    setColIndex('');
    setHighlightedCells([]);
  };

  const handleUpdateCell = () => {
    if (value === '' || rowIndex === '' || colIndex === '') return;
    updateCell(parseInt(rowIndex), parseInt(colIndex), parseInt(value));
    setValue('');
    setRowIndex('');
    setColIndex('');
    setHighlightedCells([]);
  };

  const handleSearch = () => {
    if (value === '') return;
    searchValue(parseInt(value));
    setValue('');
  };

  const handleTranspose = () => {
    transpose();
    setHighlightedCells([]);
  };

  return (
    <div className="space-y-4">
      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Value</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Row Index</label>
          <input
            type="number"
            value={rowIndex}
            onChange={(e) => setRowIndex(e.target.value)}
            placeholder="Row index"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Column Index</label>
          <input
            type="number"
            value={colIndex}
            onChange={(e) => setColIndex(e.target.value)}
            placeholder="Col index"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Operation Buttons */}
      <div className="space-y-3">
        {/* Row Operations */}
        <div>
          <p className="text-xs text-gray-500 mb-2">Row Operations</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleInsertRow}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 font-semibold cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Insert Row
            </button>
            
            <button
              onClick={handleDeleteRow}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 font-semibold cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Delete Row
            </button>
          </div>
        </div>

        {/* Column Operations */}
        <div>
          <p className="text-xs text-gray-500 mb-2">Column Operations</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleInsertColumn}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 font-semibold cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Insert Column
            </button>
            
            <button
              onClick={handleDeleteColumn}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-semibold cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Delete Column
            </button>
          </div>
        </div>

        {/* Cell & Matrix Operations */}
        <div>
          <p className="text-xs text-gray-500 mb-2">Other Operations</p>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={handleUpdateCell}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-semibold cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Update
            </button>
            
            <button
              onClick={handleSearch}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200 font-semibold cursor-pointer"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
            
            <button
              onClick={handleTranspose}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors duration-200 font-semibold cursor-pointer"
            >
              <Repeat className="w-4 h-4" />
              Transpose
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Array2DControls;
