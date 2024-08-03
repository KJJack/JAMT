import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach} from 'vitest';
import { UserProvider, UserContext } from '../util/UserContext';
import { getCurrentUser, getUserApplications } from '../api/api';
import React from 'react';

vi.mock('../api/api', () => ({
    getCurrentUser: vi.fn(),
    getUserApplications: vi.fn()
}));

const TestComponent = () => {
    const { user, applications } = React.useContext(UserContext);

    return(
        <div>
            <div>User: { user ? user.name : 'No user'}</div>
            <div>Applications: {applications.length}</div>
        </div>
    );
};

describe('UserContext', () => {
    beforeEach(() => {
        getCurrentUser.mockResolvedValueOnce({ id: 1, name: 'John Doe' });
        getUserApplications.mockResolvedValueOnce([
            { id: 1, company: 'Company A'},
            { id: 2, company: 'Company B'}
        ]);
    });


    it('should fetch and set users and applications', async () => {
        render(
            <UserProvider>
                <TestComponent />
            </UserProvider>
        );

        await waitFor(() => expect(screen.getByText('User: John Doe')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('Applications: 2')).toBeInTheDocument());
    });
});