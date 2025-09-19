import React from "react";

function App() {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);

    formData.append("access_key", import.meta.env.VITE_WEB3_FORMS_ACCESS_KEY);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("✅ Form submitted successfully!");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(`❌ ${data.message}`);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      {/* Background Image */}
      <img
        src="Login.png" // your image in public folder
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

      {/* Form container */}
      <div className="relative z-20 w-full max-w-2xl bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-2xl space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-800">Contact Us</h2>
          <p className="mt-2 text-gray-600">We’d love to hear from you.</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="John Doe"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              required
              placeholder="Inquiry about services..."
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Your Message
            </label>
            <textarea
              name="message"
              id="message"
              rows="5"
              required
              placeholder="Write your message here..."
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#FDC800] hover:bg-[#CA8A04] text-white font-semibold rounded-md shadow-md transition duration-200"
          >
            Submit Form
          </button>
        </form>

        {result && (
          <div className="text-center text-sm text-gray-700 font-medium mt-4">
            {result}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
