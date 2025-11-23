'use client';

import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { useRouter } from 'next/navigation';
import { Card, Modal } from '@/components/organisams';
import { Row, Typography, Input, CardWrapper, Icon, Button } from '@/components/atoms';
import { createUser, resetCreateUser } from '@/store/slices/createUserSlice';
import { createQuestion, resetCreateQuestion } from '@/store/slices/createQuestionSlice';
import QuizQuestions from './QuizQuestions';

export default function Dashboard() {
  const { user } = useAppSelector((state) => state.auth);
  const { loading, error, success, message } = useAppSelector((state) => state.createUser);
  const { loading: qLoading, error: qError, success: qSuccess, message: qMessage } =
    useAppSelector((state) => state.question);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'PUBLIC' });

  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [questionForm, setQuestionForm] = useState({
    questionText: '',
    options: ['', '', '', ''],
    correctAnswer: '',
  });

  useEffect(() => {
    if (!user) router.push('/');
  }, [user, router]);

  useEffect(() => {
    if (success) {
      setShowModal(false);
      setForm({ name: '', email: '', password: '', role: 'PUBLIC' });
      dispatch(resetCreateUser());
      alert(message);
    }
  }, [success, message, dispatch]);

  useEffect(() => {
    if (qSuccess) {
      setShowQuestionModal(false);
      setQuestionForm({ questionText: '', options: ['', '', '', ''], correctAnswer: '' });
      dispatch(resetCreateQuestion());
      alert(qMessage);
    }
  }, [qSuccess, qMessage, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleCreateUser = () => dispatch(createUser(form));

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id.startsWith('option')) {
      const index = Number(id.slice(-1));
      setQuestionForm((prev) => {
        const newOptions = [...prev.options];
        newOptions[index] = value;
        return { ...prev, options: newOptions };
      });
    } else {
      setQuestionForm((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleCreateQuestion = () => dispatch(createQuestion(questionForm));

  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    window.location.reload();
  };

  
  return (
    <div className="p-8">
      <Row>
        <Typography variant="xl" weight="bold">Dashboard</Typography>
        <Button icon='Logout03Icon' text='Logout' onClick={handleLogout}/>
      </Row>
      <CardWrapper className="mt-4">
        <Typography align="center" variant="xl" weight="bold">Profile Card</Typography>
        <Typography as="p" weight="bold">Welcome 😀</Typography>
        <Row className="justify-start gap-13">
          <Typography as="p" weight="bold">Name: </Typography>
          <Typography as="p">{user.name}</Typography>
        </Row>
        <Row className="justify-start gap-13">
          <Typography as="p" weight="bold">Email: </Typography>
          <Typography as="p">{user.email}</Typography>
        </Row>
        <Row className="justify-start gap-15">
          <Typography as="p" weight="bold">Role: </Typography>
          <Typography as="p">{user.role}</Typography>
        </Row>
        <Row className="justify-start gap-5">
          <Typography as="p" weight="bold">Created At: </Typography>
          <Typography as="p">{user.createdAt}</Typography>
        </Row>
      </CardWrapper>

      {user.role === 'ADMIN' && (
        <Row className="gap-3 mt-4">
          <Card
            title="Create User"
            description="Click to create a new user"
            img="/user.png"
            width={144}
            height={144}
            onClick={() => setShowModal(true)}
          />
          <Card
            title="Create Question"
            description="Click to create Question"
            img="/question.png"
            width={116}
            height={116}
            onClick={() => setShowQuestionModal(true)}
          />
        </Row>
      )}

      {showModal && (
        <Modal
          title="Create User"
          acceptText={loading ? 'Creating...' : 'Create'}
          declineText="Cancel"
          onAccept={handleCreateUser}
          onDecline={() => {
            setShowModal(false);
            setForm({ name: '', email: '', password: '', role: 'PUBLIC' }); // reset on close
          }}
          acceptDisabled={loading}
        >
          <div className="space-y-4 px-2">
            <Input id="name" label="Name" value={form.name} onChange={handleChange} placeholder="Enter name" required />
            <Input id="email" label="Email" value={form.email} onChange={handleChange} placeholder="Enter email" required />
            <Input id="password" label="Password" type="password" value={form.password} onChange={handleChange} placeholder="Enter password" required />
            <Input id="role" label="Role" disabled value={form.role} required />
            {error && <Typography align="right" color="text-alert" variant="sm">Please fill all the fields for adding user.</Typography>}
          </div>
        </Modal>
      )}

      {showQuestionModal && (
        <Modal
          title="Create Question"
          acceptText={qLoading ? 'Creating...' : 'Create'}
          declineText="Cancel"
          onAccept={handleCreateQuestion}
          onDecline={() => {
            setShowQuestionModal(false);
            setQuestionForm({ questionText: '', options: ['', '', '', ''], correctAnswer: '' });
          }}
          acceptDisabled={qLoading}
        >
          <div className="space-y-4 px-2">
            <Input id="questionText" label="Question Text" value={questionForm.questionText} onChange={handleQuestionChange} placeholder="Enter question" required />
            {questionForm.options.map((opt, idx) => (
              <Input key={idx} id={`option${idx}`} label={`Option ${idx + 1}`} value={opt} onChange={handleQuestionChange} placeholder={`Option ${idx + 1}`} required />
            ))}
            <Input id="correctAnswer" label="Correct Answer" value={questionForm.correctAnswer} onChange={handleQuestionChange} placeholder="Enter correct answer" required />
            {qError && <Typography align="right" color="text-alert" variant="sm">Please fill all the fields correctly.</Typography>}
          </div>
        </Modal>
      )}
      <QuizQuestions />
    </div>
  );
}
