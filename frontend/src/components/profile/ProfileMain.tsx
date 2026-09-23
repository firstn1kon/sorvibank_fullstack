import { useSseions } from '../../api/hooks/useSessions';

const ProfileMain = () => {
    const { data: sessions } = useSseions();
    console.log(sessions);
    return <div>Profile page</div>;
};

export default ProfileMain;
