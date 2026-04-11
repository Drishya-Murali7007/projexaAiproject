import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/announcements')
      .then(res => setAnnouncements(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>

      {announcements.map((a: any) => (
        <div key={a.id}>
          <h3>{a.title}</h3>
          <p>{a.content}</p>
        </div>
      ))}
    </div>
  );
}