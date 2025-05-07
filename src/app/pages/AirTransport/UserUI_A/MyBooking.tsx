// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API_URL = import.meta.env.VITE_APP_API_URL;

// export const MyBooking = () => {
//   const [bookingDetails, setBookingDetails] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       const userId = localStorage.getItem("userId");
//       if (!userId) {
//         alert("No user ID found in local storage.");
//         setLoading(false);
//         return;
//       }

//       try {
//         // Fetch bookings and their associated flight details
//         const bookingsResponse = await axios.get(`${API_URL}/bookings/user/${userId}`);
//         const bookingsWithFlights = await Promise.all(
//           bookingsResponse.data.map(async (booking: any) => {
//             try {
//               const flightResponse = await axios.get(`${API_URL}/flights/${booking.flightId}`);
//               return { ...booking, flight: flightResponse.data };
//             } catch (error) {
//               console.error(`Error fetching flight for booking ${booking.id}:`, error);
//               return { ...booking, flight: null };
//             }
//           })
//         );

//         setBookingDetails(bookingsWithFlights);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching details:", error);
//         alert("Failed to fetch booking details. Please try again.");
//         setLoading(false);
//       }
//     };

//     fetchDetails();
//   }, []);

//   if (loading) return <div>Loading booking details...</div>;
//   if (bookingDetails.length === 0) return <div>No bookings found for the user.</div>;

//   return (
//     <div className="container mt-4">
//       <h3 className="mb-4">My Booking Details</h3>

//       <table className="table table-bordered table-hover">
//         <thead className="table-primary">
//           <tr>
//             <th>Booking ID</th>
//             <th>Flight Number</th>
//             <th>Route</th>
//             <th>Traveler Count</th>
//             <th>Status</th>
//             <th>Departure Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bookingDetails.map((booking) => (
//             <tr key={booking.id}>
//               <td>{booking.id}</td>
//               <td>{booking.flight?.flightNumber || "N/A"}</td>
//               <td>
//                 {booking.flight
//                   ? `${booking.flight.origin} → ${booking.flight.destination}`
//                   : "N/A"}
//               </td>
//               <td>{booking.travellerCount}</td>
//               <td>{booking.status || "Confirmed"}</td>
//               <td>{booking.flight?.departureDate || "N/A"}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const MyBooking = () => {
  const [bookingDetails, setBookingDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("No user ID found in local storage.");
        setLoading(false);
        return;
      }

      try {
        // Fetch bookings and their associated flight details
        const bookingsResponse = await axios.get(`${API_URL}/bookings/user/${userId}`);
        const bookingsWithFlights = await Promise.all(
          bookingsResponse.data.map(async (booking: any) => {
            try {
              const flightResponse = await axios.get(`${API_URL}/flights/${booking.flightId}`);
              return { ...booking, flight: flightResponse.data };
            } catch (error) {
              console.error(`Error fetching flight for booking ${booking.id}:`, error);
              return { ...booking, flight: null };
            }
          })
        );

        setBookingDetails(bookingsWithFlights);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching details:", error);
        alert("Failed to fetch booking details. Please try again.");
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  if (loading) return <div>Loading booking details...</div>;
  if (bookingDetails.length === 0) return <div>No bookings found for the user.</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">My Booking Details</h3>

      <table className="table table-bordered table-hover">
        <thead className="table-primary">
          <tr>
            <th>Booking ID</th>
            <th>Flight Number</th>
            <th>Airline</th>
            <th>Class</th>
            <th>Route</th>
            <th>Price</th>
            <th>Traveler Count</th>
            <th>Status</th>
            <th>Departure</th>
            <th>Arrival</th>
          </tr>
        </thead>
        <tbody>
          {bookingDetails.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.flight?.flightName || "N/A"}</td>
              <td>{booking.flight?.airline || "N/A"}</td>
              <td>{booking.flight?.flightClass || "N/A"}</td>
              <td>
                {booking.flight
                  ? `${booking.flight.source} → ${booking.flight.destination}`
                  : "N/A"}
              </td>
              <td>{booking.flight?.price ? `₹${booking.flight.price}` : "N/A"}</td>
              <td>{booking.travellerCount}</td>
              <td>{booking.flight?.status || "Scheduled"}</td>
              <td>
                {booking.flight?.departure
                  ? new Date(booking.flight.departure).toLocaleString()
                  : "N/A"}
              </td>
              <td>
                {booking.flight?.arrival
                  ? new Date(booking.flight.arrival).toLocaleString()
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};