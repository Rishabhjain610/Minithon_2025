import React, { useState, useContext } from "react";
import { AuthDataContext } from "../context/AuthContext";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import stamp from "../assets/stamp.png"; // Adjust path if needed

const Form = () => {
  const { serverUrl } = useContext(AuthDataContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    dateIn: "",
    dateOut: "",
  });
  const [uploadedImage, setUploadedImage] = useState(null);
  const [sending, setSending] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Generate PDF and call Twilio API
  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = document.getElementById("pdf-content");
    if (!input) return;

    // Generate PDF
    html2canvas(input).then(async (canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("DormitoryBookingSlip.pdf");

      // Call Twilio API
      setSending(true);
      try {
        await axios.post(`${serverUrl}/api/twilio/send`);
        alert("WhatsApp confirmation sent!");
      } catch (err) {
        alert("Failed to send WhatsApp confirmation.");
      }
      setSending(false);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dormitory Booking</h1>
      <form
        className="bg-white shadow-lg rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date In</label>
          <input
            type="date"
            name="dateIn"
            value={formData.dateIn}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date Out</label>
          <input
            type="date"
            name="dateOut"
            value={formData.dateOut}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload ID Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-3 border rounded-lg"
          />
        </div>
        {/* Fixed fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="text"
            value="6000"
            disabled
            className="w-full p-3 border rounded-lg bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            value="Mumbai"
            disabled
            className="w-full p-3 border rounded-lg bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Dormitory Name</label>
          <input
            type="text"
            value="Shiv Sagar Dormitory"
            disabled
            className="w-full p-3 border rounded-lg bg-gray-100"
          />
        </div>
        <button
          type="submit"
          disabled={sending}
          className="col-span-1 md:col-span-2 mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600"
        >
          {sending ? "Processing..." : "Generate PDF & Confirm Booking"}
        </button>
      </form>

      {/* Hidden PDF Content */}
      <div
        id="pdf-content"
        style={{ position: "absolute", left: "-9999px", top: 0 }}
        className="bg-white shadow-lg rounded-lg p-6 w-full md:w-2/3 lg:w-1/2 border border-gray-300 flex flex-col items-center"
      >
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center my-8">Dormitory Booking Slip</h2>
          <img src={stamp} alt="Stamp" className="w-24 h-24 absolute top-4 right-4 object-cover rounded-lg" />
        </div>
        <table className="w-full border-collapse border border-gray-300 text-left">
          <tbody>
            <tr>
              <th className="p-3 text-gray-800 font-semibold border-r border-gray-300">First Name:</th>
              <td className="p-3 text-gray-600">{formData.firstName}</td>
            </tr>
            <tr>
              <th className="p-3 text-gray-800 font-semibold border-r border-gray-300">Last Name:</th>
              <td className="p-3 text-gray-600">{formData.lastName}</td>
            </tr>
            <tr>
              <th className="p-3 text-gray-800 font-semibold border-r border-gray-300">Date of Birth:</th>
              <td className="p-3 text-gray-600">{formData.dob}</td>
            </tr>
            <tr>
              <th className="p-3 text-gray-800 font-semibold border-r border-gray-300">Date In:</th>
              <td className="p-3 text-gray-600">{formData.dateIn}</td>
            </tr>
            <tr>
              <th className="p-3 text-gray-800 font-semibold border-r border-gray-300">Date Out:</th>
              <td className="p-3 text-gray-600">{formData.dateOut}</td>
            </tr>
            <tr>
              <th className="p-3 text-gray-800 font-semibold border-r border-gray-300">Amount:</th>
              <td className="p-3 text-gray-600">6000</td>
            </tr>
            <tr>
              <th className="p-3 text-gray-800 font-semibold border-r border-gray-300">Location:</th>
              <td className="p-3 text-gray-600">Mumbai</td>
            </tr>
            <tr>
              <th className="p-3 text-gray-800 font-semibold border-r border-gray-300">Dormitory Name:</th>
              <td className="p-3 text-gray-600">Shiv Sagar Dormitory</td>
            </tr>
          </tbody>
        </table>
        {uploadedImage && (
          <div className="mt-6 w-full text-center">
            <h3 className="font-semibold text-gray-800 mb-4">Student ID:</h3>
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="w-full max-w-xs h-auto object-cover rounded-lg mx-auto"
            />
          </div>
        )}
        <img src={stamp} alt="Verified Stamp" className="w-24 h-24 mt-6" />
      </div>
    </div>
  );
};

export default Form;