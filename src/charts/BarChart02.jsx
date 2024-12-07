// src/charts/BarChart02.jsx
import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js';
import { chartColors } from './ChartjsConfig'; // Pastikan ini ada di folder yang sesuai

function BarChart02({ data, width, height }) {
  const chartRef = useRef(null); // Menggunakan useRef untuk referensi canvas
  const chartInstanceRef = useRef(null); // Untuk menyimpan instance chart

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); // Hancurkan chart lama jika ada
    }

    const ctx = chartRef.current.getContext('2d'); // Mendapatkan context dari canvas

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar', // Jenis chart: bar chart
      data: data, // Data yang diterima dari parent
      options: {
        responsive: true,
        scales: {
          x: {
            ticks: {
              beginAtZero: true,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return `$${value.toLocaleString()}`; // Format angka sebagai mata uang
              },
            },
          },
        },
        plugins: {
          legend: {
            position: 'top', // Posisi legend di atas grafik
          },
        },
      },
    });

    // Bersihkan chart saat komponen unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]); // Re-run useEffect saat data berubah

  return (
    <canvas
      ref={chartRef} // Menetapkan referensi canvas
      width={width}
      height={height}
    />
  );
}

export default BarChart02;
