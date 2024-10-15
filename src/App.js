import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
    return (
        <ErrorBoundary>
            <div>
                <h1>Welcome to Modelalt</h1>
                <p>This is a basic setup for your project.</p>
            </div>
        </ErrorBoundary>
    );
}

export default App;