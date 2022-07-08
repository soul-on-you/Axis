import { Button } from 'antd';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '../../api/AuthApi';
import { logout, selectUser } from '../../store/slices/AuthSlice'

function Profile() {
    const person = useSelector(selectUser);
    const dispatch = useDispatch();
    const [fetch_logout] = useLogoutMutation();

    const handleLogout = async () => {
        await fetch_logout();
        dispatch(logout());
    }
    return (
        <div>
            {person.role}
            <Button onClick={handleLogout}>Выйти</Button>
        </div>
    )
}

export default Profile
