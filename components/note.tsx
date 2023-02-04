interface NoteProps {
  id: number;
  title: string;
  content: string;
  date: string;
}

const Note: React.FC<NoteProps> = ({ title, content, date }) => {
  return (
    <article className='flex flex-col w-max h-max max-w-[300px] bg-slate-700 rounded-md p-2'>
      <h5 className='text-xl font-bold '>{title}</h5>
      <p className='mb-4'>{new Date(date).toLocaleDateString()}</p>
      <p>
        {content} asd kmsa dkasdk a Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam deserunt ullam soluta
        ab voluptatem voluptatum doloribus, voluptates, dolorem cum, at eligendi iure? Nulla impedit earum perspiciatis,
        est ea totam deleniti. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nisi veniam aperiam
        dolorum eum autem blanditiis commodi distinctio debitis in accusamus sunt, ipsa a corporis voluptate natus fugit
        vero iure?
      </p>
    </article>
  );
};

export default Note;
