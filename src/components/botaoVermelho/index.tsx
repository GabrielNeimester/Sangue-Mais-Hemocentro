import React from 'react';
import PropTypes from 'prop-types';
import styles from "./BotaoVermelho.module.css"

interface BotaoVermelhoProps {
  text: string;
  link: string;
}

const BotaoVermelho: React.FC<BotaoVermelhoProps> = ({ text, link }) => {
  return (
    <a href={link} className={styles.redButton}>
      <span>{text}</span>
    </a>
  );
};

BotaoVermelho.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default BotaoVermelho;
