import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { UserContext, UserProvider } from '../util/UserContext'; 
import { getCurrentUser, postUserLogin, getUserApplications } from '../api/api';
import { BrowserRouter } from 'react-router-dom';
import React from 'react'
import Login from '../components/Login';

vi.mock('../api/api', () => ({
    getCurrentUser: vi.fn(),
    postUserLogin: vi.fn(),
    getUserApplications: vi.fn()
}));

const renderScreen = () => {
    return(
        <UserProvider>
            <BrowserRouter>
                <Login />
                <TestComponent/>
            </BrowserRouter>
        </UserProvider>
    );
};

const TestComponent = () => {
    const { user, applications } = React.useContext(UserContext);

    return (
        <div>
            <div>User: {user ? user.name : 'No User'}</div>
            <div>Applications: {applications.length}</div>
        </div>
    );
};

describe('Integration Test: Login and UserContext', () => {
    const mockToken = 'mock-test-token';
    const mockUser = { id: 1, name: 'John Doe'};
    const mockApplications = [
        { id: 1, company: 'Company A'},
        { id: 2, company: 'Company B'}
    ];

    beforeEach(() => {
        postUserLogin.mockResolvedValueOnce({
            status: 200,
            data: {
                token: mockToken,
                user: mockUser,
            },
        });


        getCurrentUser.mockResolvedValueOnce(mockUser);
        getUserApplications.mockResolvedValueOnce(mockApplications);
    });

    it('should login and fetch user applications', async () => {
        render(renderScreen());

        fireEvent.change(screen.getByPlaceholderText('Username'), {target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'testpass' } });
        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => expect(postUserLogin).toHaveBeenCalledWith({
            email: 'testuser',
            password: 'testpass',
        }));

        await waitFor(() => expect(localStorage.getItem('token')).toBe(mockToken));

        await waitFor(() => expect(screen.getByText('User: John Doe')).toBeInTheDocument());

        await waitFor(() => expect(screen.getByText('Applications: 2')).toBeInTheDocument());

        expect(getUserApplications).toHaveBeenCalledWith(mockUser.id);
    });
});
