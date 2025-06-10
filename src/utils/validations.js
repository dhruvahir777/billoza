export const validateForm = (formData, activeTab) => {
  const errors = {};

  if (activeTab === "basic") {
    if (!formData.fileNumber) errors.fileNumber = "File Number is required.";
    if (!formData.clientName) errors.clientName = "Client Name is required.";
    if (!formData.mobileNumber)
      errors.mobileNumber = "Mobile Number is required.";
  }

  if (activeTab === "business") {
    if (!formData.businessType)
      errors.businessType = "Business Type is required.";
    if (!formData.businessName)
      errors.businessName = "Business Name is required.";
    if (!formData.gstNumber) errors.gstNumber = "GST number is required.";
  }

  if (activeTab === "personal") {
    if (!formData.panNumber) errors.panNumber = "PAN Number is required.";
    if (!formData.aadharNumber)
      errors.aadharNumber = "Aadhar Number is required.";
  }

  if (activeTab === "bank") {
    if (!formData.bankName) errors.bankName = "Bank Name is required.";
    if (!formData.accountNumber)
      errors.accountNumber = "Account Number is required.";
  }

  if (activeTab === "additional") {
    if (!formData.dateOfEntry)
      errors.dateOfEntry = "Date of Entry is required.";
  }

  return errors;
};
