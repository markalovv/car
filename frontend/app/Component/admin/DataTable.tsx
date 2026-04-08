'use client';

import React, { useState, useMemo } from 'react';

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: any, item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onAdd?: () => void;
  addButtonText?: string;
  loading?: boolean;
}

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchPlaceholder = "ค้นหา...",
  onEdit,
  onDelete,
  onAdd,
  addButtonText = "เพิ่มใหม่",
  loading = false
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    return data.filter(item =>
      columns.some(column => {
        const value = item[column.key];
        return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm, columns]);

  // Sort filtered data
  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;

    if (sortColumn === column.key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column.key);
      setSortDirection('asc');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B0E4CC]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a2e2a] border border-[#285A48] rounded-xl overflow-hidden">
      {/* Header with search and add button */}
      <div className="p-4 border-b border-[#285A48] flex justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#091413] border border-[#285A48] text-white px-4 py-2 pl-10 rounded-lg outline-none focus:border-[#B0E4CC]"
          />
          <span className="absolute left-3 top-2.5 text-[#408A71]">🔍</span>
        </div>
        {onAdd && (
          <button
            onClick={onAdd}
            className="bg-[#285A48] text-[#B0E4CC] px-4 py-2 rounded-lg hover:bg-[#408A71] transition-colors ml-4"
          >
            {addButtonText}
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#091413]">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key as string}
                  className={`px-4 py-3 text-left text-[#B0E4CC] font-medium ${
                    column.sortable ? 'cursor-pointer hover:bg-[#1a2e2a]' : ''
                  }`}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable && sortColumn === column.key && (
                      <span className="text-xs">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-4 py-3 text-left text-[#B0E4CC] font-medium">
                  จัดการ
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                  className="px-4 py-8 text-center text-[#408A71]"
                >
                  ไม่พบข้อมูล
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => (
                <tr key={index} className="border-t border-[#285A48] hover:bg-[#1a2e2a]/50">
                  {columns.map((column) => (
                    <td key={column.key as string} className="px-4 py-3 text-white">
                      {column.render
                        ? column.render(item[column.key], item)
                        : item[column.key]?.toString() || '-'
                      }
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(item)}
                            className="bg-[#408A71] text-white px-3 py-1 rounded text-sm hover:bg-[#53ffc6] transition-colors"
                          >
                            แก้ไข
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(item)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                          >
                            ลบ
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-4 py-3 border-t border-[#285A48] flex justify-between items-center">
          <div className="text-[#B0E4CC] text-sm">
            แสดง {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, sortedData.length)} จาก {sortedData.length} รายการ
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-[#285A48] text-[#B0E4CC] rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#408A71] transition-colors"
            >
              ก่อนหน้า
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
              if (page > totalPages) return null;

              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded transition-colors ${
                    page === currentPage
                      ? 'bg-[#B0E4CC] text-[#091413] font-medium'
                      : 'bg-[#285A48] text-[#B0E4CC] hover:bg-[#408A71]'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-[#285A48] text-[#B0E4CC] rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#408A71] transition-colors"
            >
              ถัดไป
            </button>
          </div>
        </div>
      )}
    </div>
  );
}