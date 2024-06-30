import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchGuestbook, addGuestbookEntry, updateGuestbookEntry, deleteGuestbookEntry } from '../services/guestbook';

const GuestbookPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: guestbookEntries } = useQuery('guestbook', fetchGuestbook);
  const addEntryMutation = useMutation(addGuestbookEntry, {
    onSuccess: () => queryClient.invalidateQueries('guestbook'),
  });

  const [userid, setUserid] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  return (
    <div>
      <div>
        <input placeholder="User ID" value={userid} onChange={(e) => setUserid(e.target.value)} />
        <input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <input placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
        <button onClick={() => addEntryMutation.mutate({ userid, subject, content })}>Add Entry</button>
      </div>
      <div>
        {guestbookEntries?.map((entry: any) => (
          <GuestbookEntry key={entry.articleno} entry={entry} queryClient={queryClient} />
        ))}
      </div>
    </div>
  );
};

const GuestbookEntry: React.FC<{ entry: any; queryClient: any }> = ({ entry, queryClient }) => {
  const [localSubject, setLocalSubject] = useState(entry.subject);
  const [localContent, setLocalContent] = useState(entry.content);
  const updateEntryMutation = useMutation(
    ({ articleno, entry }: { articleno: number; entry: { subject: string; content: string } }) =>
      updateGuestbookEntry(articleno, entry),
    {
      onSuccess: () => queryClient.invalidateQueries('guestbook'),
    }
  );

  const deleteEntryMutation = useMutation(deleteGuestbookEntry, {
    onSuccess: () => queryClient.invalidateQueries('guestbook'),
  });

  return (
    <div style={{ padding: "10px", margin: "5px", border: "1px solid #ccc" }}>
      <div>Article No: {entry.articleno}</div>
      <div>User ID: {entry.userid}</div>
      <div>Registration Time: {entry.regtime}</div>
      <input value={localSubject} onChange={(e) => setLocalSubject(e.target.value)} />
      <input value={localContent} onChange={(e) => setLocalContent(e.target.value)} />
      <button onClick={() => updateEntryMutation.mutate({
        articleno: entry.articleno,
        entry: { subject: localSubject, content: localContent }
      })}>Update</button>
      <button onClick={() => deleteEntryMutation.mutate(entry.articleno)}>Delete</button>
    </div>
  );
};

export default GuestbookPage;
