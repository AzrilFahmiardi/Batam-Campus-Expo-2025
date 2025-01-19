import React, { useState, useEffect } from 'react';
const SERVER_URL = import.meta.env.VITE_API_URL;

const TicketTable = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/tickets`);
      const data = await response.json();
      
      // Urutkan tiket: false (belum dikonfirmasi) di atas
      const sortedTickets = data.sort((a, b) => {
        if (a.status_ticket === b.status_ticket) return 0;
        return a.status_ticket ? 1 : -1;
      });
      
      setTickets(sortedTickets);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setLoading(false);
    }
  };

  const handleConfirm = async (email) => {
    try {
      const response = await fetch(`${SERVER_URL}/send-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('Konfirmasi tiket berhasil dikirim!');
        // Refresh data tiket
        await fetchTickets();
      } else {
        throw new Error('Failed to send confirmation');
      }
    } catch (error) {
      console.error('Error in confirmation process:', error);
      alert('Gagal mengirim konfirmasi tiket');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Daftar Tiket</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Username IG</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Bukti Pembayaran</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tickets.map((ticket, index) => (
                <tr key={index} className={`hover:bg-gray-50 ${!ticket.status_ticket ? 'bg-yellow-50' : ''}`}>
                  <td className="px-6 py-4 text-sm text-gray-700">{ticket.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{ticket.username_ig}</td>
                  <td className="px-6 py-4 text-sm">
                    <a
                      href={`${SERVER_URL}/public/upload/pembayaran/${ticket.username_ig}.jpg`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Lihat Bukti
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span 
                      className={`px-2 py-1 rounded-full text-xs ${
                        ticket.status_ticket 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {ticket.status_ticket ? 'Terkonfirmasi' : 'Menunggu Konfirmasi'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {!ticket.status_ticket && (
                      <button
                        onClick={() => handleConfirm(ticket.email)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                      >
                        Konfirmasi
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TicketTable;