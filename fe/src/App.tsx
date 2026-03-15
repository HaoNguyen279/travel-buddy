import React, { useState, useEffect } from 'react';

const App= () => {
  return (
    <div>
      <h1>Welcome to the App!</h1>

      <footer>
        <p>© 2024 My App. All rights reserved.</p>

      </footer>
    </div>
  );

}

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: '2rem', 
    marginBottom: '1rem',
  },
  footer: {
    marginTop: '2rem',
    fontSize: '0.8rem',
    color: '#f3f3f5',
  },
  footer_text: {
    color: '#f3f3f5',
  },
};
export default App;