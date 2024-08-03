import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../util/UserContext';
import Login from '../components/Login';
import { postUserLogin } from '../api/api';
import { vi, it, describe, expect } from 'vitest';

vi.mock('../api/api');

const renderScreen = () => {
    render(
        <MemoryRouter>
            <UserProvider>
                <Login />
            </UserProvider>
        </MemoryRouter>
    )
}

describe('Login Component', () => {
    it('should render login form', () => {
        renderScreen();

        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    it('should handle successful login', async () => {
        postUserLogin.mockResolvedValueOnce({
            status: 200,
            data: {
                token: 'test-token',
                user: {
                    id: 1,
                    name: 'John Doe'
                }
            }
        });

        renderScreen();

        fireEvent.change(screen.getByPlaceholderText('Username'), {target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), {target: { value: 'password' } });
        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(screen.getByText('Login Successful')).toBeInTheDocument();
        });

        expect(localStorage.getItem('token')).toBe('test-token');
    });

    it('should handle rejected login', async () => {
        postUserLogin.mockRejectedValueOnce({
            response: {
                data: {
                    message: 'Invalid credentials'
                }
            }
        });

        renderScreen();

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });
        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
        });
    });
});