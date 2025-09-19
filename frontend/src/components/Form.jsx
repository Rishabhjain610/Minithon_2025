import React, { useState, useContext } from "react";
import { AuthDataContext } from "../context/AuthContext";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Roomy from "../../public/Roomy.png"; // Use your provided image as logo
import stamp from "../assets/stamp.png"; // Use same image for stamp

const Form = () => {
  const { serverUrl } = useContext(AuthDataContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    dateIn: "",
    dateOut: "",
    customerId: "",
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

    input.style.background = "#fff";
    input.style.color = "#222";

    html2canvas(input, {
      backgroundColor: "#fff",
      useCORS: true,
    }).then(async (canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("DormitoryBookingSlip.pdf");

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
    <div className="min-h-screen bg-white flex flex-col items-center py-10 px-2">
      <form
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl flex flex-col gap-8"
        onSubmit={handleSubmit}
      >
        {/* Logo at top center */}
        <div className="flex justify-center mb-4">
          <img src={Roomy} alt="Logo" className="w-32 h-32 object-contain" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your first name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your last name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              required
              className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Date In</label>
            <input
              type="date"
              name="dateIn"
              value={formData.dateIn}
              onChange={handleInputChange}
              required
              className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Date Out</label>
            <input
              type="date"
              name="dateOut"
              value={formData.dateOut}
              onChange={handleInputChange}
              required
              className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="font-semibold text-gray-700">
              Upload ID Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="p-3 border border-gray-300 rounded-xl"
            />
          </div>
        </div>
        {/* Fixed fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Amount</label>
            <input
              type="text"
              value="6000"
              disabled
              className="p-3 border border-gray-300 rounded-xl bg-gray-100"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Location</label>
            <input
              type="text"
              value="Mumbai"
              disabled
              className="p-3 border border-gray-300 rounded-xl bg-gray-100"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">
              Dormitory Name
            </label>
            <input
              type="text"
              value="Shiv Sagar Dormitory"
              disabled
              className="p-3 border border-gray-300 rounded-xl bg-gray-100"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={sending}
          className="mt-4 bg-[#FDC800] text-white py-3 px-6 rounded-xl shadow-lg  transition"
        >
          {sending ? "Processing..." : "Generate PDF & Confirm Booking"}
        </button>
      </form>

      {/* Hidden PDF Content */}
      <div
        id="pdf-content"
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          background: "#fff",
          color: "#222",
          width: "100%",
          maxWidth: "700px",
          padding: "32px",
          borderRadius: "16px",
          border: "1px solid #ccc",
        }}
      >
        {/* Logo at top center */}
        <div
          style={{ width: "100%", textAlign: "center", marginBottom: "32px" }}
        >
          <img
            src={Roomy}
            alt="Logo"
            style={{ width: "120px", height: "120px", objectFit: "contain" }}
          />
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#1e40af",
              textAlign: "center",
              margin: "24px 0",
            }}
          >
            Dormitory Booking Slip
          </h2>
        </div>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #ccc",
            textAlign: "left",
            marginBottom: "24px",
          }}
        >
          <tbody>
            <tr>
              <th
                style={{
                  padding: "12px",
                  color: "#1e40af",
                  fontWeight: "600",
                  borderRight: "1px solid #ccc",
                  width: "180px",
                }}
              >
                First Name:
              </th>
              <td style={{ padding: "12px", color: "#444" }}>
                {formData.firstName}
              </td>
            </tr>
            <tr>
              <th
                style={{
                  padding: "12px",
                  color: "#1e40af",
                  fontWeight: "600",
                  borderRight: "1px solid #ccc",
                }}
              >
                Last Name:
              </th>
              <td style={{ padding: "12px", color: "#444" }}>
                {formData.lastName}
              </td>
            </tr>
            <tr>
              <th
                style={{
                  padding: "12px",
                  color: "#1e40af",
                  fontWeight: "600",
                  borderRight: "1px solid #ccc",
                }}
              >
                Date of Birth:
              </th>
              <td style={{ padding: "12px", color: "#444" }}>{formData.dob}</td>
            </tr>
            <tr>
              <th
                style={{
                  padding: "12px",
                  color: "#1e40af",
                  fontWeight: "600",
                  borderRight: "1px solid #ccc",
                }}
              >
                Date In:
              </th>
              <td style={{ padding: "12px", color: "#444" }}>
                {formData.dateIn}
              </td>
            </tr>
            <tr>
              <th
                style={{
                  padding: "12px",
                  color: "#1e40af",
                  fontWeight: "600",
                  borderRight: "1px solid #ccc",
                }}
              >
                Date Out:
              </th>
              <td style={{ padding: "12px", color: "#444" }}>
                {formData.dateOut}
              </td>
            </tr>

            <tr>
              <th
                style={{
                  padding: "12px",
                  color: "#1e40af",
                  fontWeight: "600",
                  borderRight: "1px solid #ccc",
                }}
              >
                Amount:
              </th>
              <td style={{ padding: "12px", color: "#444" }}>6000</td>
            </tr>
            <tr>
              <th
                style={{
                  padding: "12px",
                  color: "#1e40af",
                  fontWeight: "600",
                  borderRight: "1px solid #ccc",
                }}
              >
                Location:
              </th>
              <td style={{ padding: "12px", color: "#444" }}>Mumbai</td>
            </tr>
            <tr>
              <th
                style={{
                  padding: "12px",
                  color: "#1e40af",
                  fontWeight: "600",
                  borderRight: "1px solid #ccc",
                }}
              >
                Dormitory Name:
              </th>
              <td style={{ padding: "12px", color: "#444" }}>
                Shiv Sagar Dormitory
              </td>
            </tr>
          </tbody>
        </table>
        {/* ID Image from user */}
        {uploadedImage && (
          <div
            style={{ marginBottom: "32px", width: "100%", textAlign: "center" }}
          >
            <h3
              style={{
                fontWeight: "600",
                color: "#1e40af",
                marginBottom: "16px",
              }}
            >
              Customer ID Image:
            </h3>
            <img
              src={uploadedImage}
              alt="Uploaded"
              style={{
                width: "100%",
                maxWidth: "240px",
                height: "auto",
                objectFit: "cover",
                borderRadius: "12px",
                margin: "0 auto",
              }}
            />
          </div>
        )}
        {/* Stamp at bottom center */}
        <div style={{ width: "100%", textAlign: "center", marginTop: "24px" }}>
          <img
            src={stamp}
            alt="Stamp"
            style={{ width: "120px", height: "120px", objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Form;
