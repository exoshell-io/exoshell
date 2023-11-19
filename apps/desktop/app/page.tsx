import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <TaskEditor />
      <TaskList />
    </main>
  );
}

const TaskList: React.FC = () => {
  return null;
};

const TaskEditor: React.FC = () => {
  return null;
};
