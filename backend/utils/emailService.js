import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  // Configure your email service here
  // For example, using Gmail:
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (email, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify Your Email',
    html: `
      <h1>Welcome to JobBoard</h1>
      <p>Please click the link below to verify your email:</p>
      <a href="${process.env.FRONTEND_URL}/verify-email/${token}">Verify Email</a>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendJobAlertEmails = async (job) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    subject: `New Job Alert: ${job.title}`,
    html: `
      <h1>New Job Opportunity</h1>
      <h2>${job.title}</h2>
      <p>${job.description}</p>
      <p>Experience Level: ${job.experienceLevel}</p>
      <p>Application Deadline: ${job.endDate}</p>
      <a href="${process.env.FRONTEND_URL}/job/${job._id}">View Job Details</a>
    `,
  };

  for (const candidateEmail of job.candidates) {
    mailOptions.to = candidateEmail;
    await transporter.sendMail(mailOptions);
  }
};