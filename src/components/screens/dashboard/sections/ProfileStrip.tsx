import { dashboardMock } from '../../../../lib/constants/mockDashboard';

export const ProfileStrip = () => {
  return (
    <div className="profile-strip">
      <div className="profile-avatar">??</div>
      <div className="profile-info">
        <div className="profile-name">{dashboardMock.profileName}</div>
        <div className="profile-meta">{dashboardMock.profileMeta}</div>
      </div>
      <div className="profile-tags">
        {dashboardMock.profileTags.map((tag) => (
          <span key={tag.id} className={`profile-tag badge-${tag.tone}`}>
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
};

