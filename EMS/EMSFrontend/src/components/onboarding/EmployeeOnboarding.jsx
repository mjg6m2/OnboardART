import React from 'react';

const EmployeeOnboarding = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Onboarding</h1>
      <p style={styles.subtitle}>
        Here you can view and complete your onboarding tasks.
      </p>
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Watch Training Videos</h2>
          <p style={styles.cardDescription}>
            Learn the basics of our tools and workflow.
          </p>
          <button style={styles.button}>Start Training</button>
        </div>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Fill Out Forms</h2>
          <p style={styles.cardDescription}>
            Complete necessary documentation for your role.
          </p>
          <button style={styles.button}>Get Started</button>
        </div>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Meet the Team</h2>
          <p style={styles.cardDescription}>
            Schedule your introductory meetings.
          </p>
          <button style={styles.button}>Schedule Now</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#F4F2F8',
    color: '#58536E',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#8A8693',
    marginBottom: '30px',
    textAlign: 'center',
    maxWidth: '600px',
  },
  cardContainer: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    padding: '20px',
    width: '300px',
    textAlign: 'center',
    transition: 'transform 0.2s ease-in-out',
    cursor: 'pointer',
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '10px',
  },
  cardDescription: {
    fontSize: '1rem',
    color: '#8A8693',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#58536E',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#474058',
  },
};

export default EmployeeOnboarding;
