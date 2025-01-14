import { motion, useDragControls } from 'motion/react';

export const Quickbar: React.FC = () => {
  const constraintsRef = useRef(null);
  const dragControls = useDragControls();
  const [dragging, setDragging] = useState(false);
  const startDrag = useCallback(
    (event: React.PointerEvent) => {
      dragControls.start(event);
      setDragging(true);
    },
    [dragControls],
  );

  return (
    <motion.div
      ref={constraintsRef}
      className='fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center'
    >
      <motion.div
        className='h-28 w-[690px] overflow-clip rounded-md border bg-white shadow-md'
        drag
        dragMomentum={false}
        dragConstraints={constraintsRef}
        dragControls={dragControls}
        dragListener={false}
        dragElastic={false}
      >
        <div
          className={`h-4 w-full ${dragging ? 'cursor-grabbing' : 'cursor-grab'} bg-red-500`}
          onPointerDown={startDrag}
          onPointerUp={() => {
            setDragging(false);
          }}
        />
        <div className='h-14'>
          <textarea placeholder='Ask anything...' className='w-full bg-white' />
        </div>
      </motion.div>
    </motion.div>
  );
};
