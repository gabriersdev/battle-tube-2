'use client';

import React from 'react';
import {motion, Variants} from 'framer-motion';
import {ScreenData} from '@/resources/presentation';
import {ScreenItem} from './screen-item';
import {Container, Row, Col} from 'react-bootstrap';

interface ScreenProps {
  data: ScreenData;
}

// Variantes para o container da tela (entrada/saída global)
const screenVariants: Variants = {
  initial: {opacity: 0},
  animate: (custom: {backgroundColor?: string}) => ({
    opacity: 1,
    backgroundColor: custom.backgroundColor || 'transparent', // Anima a cor de fundo se fornecida
    transition: {
      duration: 1,
      when: 'beforeChildren',
    }
  }),
  exit: {
    opacity: 0,
    transition: {duration: 0.5}
  }
};

// Variantes para o container interno dos itens (controle de stagger)
const contentVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const Screen: React.FC<ScreenProps> = ({data}) => {
  return (
    <motion.div
      key={data.id}
      custom={{backgroundColor: data.backgroundColor}} // Passa a cor customizada para as variantes
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`w-100 h-100 d-flex align-items-center justify-content-center my-3 ${data.backgroundClassName || ''}`}
      style={{
        // Se não houver animação de cor, podemos definir aqui também como fallback ou inicial
        // Mas a variante 'animate' cuidará da transição suave
        backgroundColor: data.backgroundColor || 'transparent'
      }}
    >
      <Container fluid="md" className="h-100 d-flex flex-column justify-content-center">
        <motion.div
          variants={contentVariants}
          className="w-100"
        >
          <Row className="w-100">
            <Col xs={12} md={10} lg={8} className="d-flex flex-column w-100">
              {data.items.map((item) => (
                <ScreenItem key={item.id} item={item}/>
              ))}
            </Col>
          </Row>
        </motion.div>
      </Container>
    </motion.div>
  );
};
