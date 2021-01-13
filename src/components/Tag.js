import styles from '../styles/components/tag.module.scss';

const Tag = ({ tag }) => {
  return (
    <div>
      <span>{tag}</span>
      <div>
        <img />
      </div>
    </div>
  );
};

export default Tag;
