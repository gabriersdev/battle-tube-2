import { Button, Alert, ListGroup, Badge } from "react-bootstrap";
import { useState, ReactNode } from "react";

import Util from "./util";
import data from "./scrapping";
import Dialog from "./dialog";
import AnimationPresence from "./animation-presence";
import {targetExternalLink} from "@/resources/config";

const StatisticDialog = () => {
  // Corrigindo a ordenação - deve ser descendente (maior para menor)
  const { currentYear, totalClips, monthMoreClips, topClippers, totalViews, topClips } = {
    ...data,
    monthMoreClips: [...data.monthMoreClips].sort((a, b) => b[1] - a[1]),
    topClippers: [...data.topClippers].sort((a, b) => b[1] - a[1]),
    topClips: [...data.topClips].sort((a, b) => b.view_count - a.view_count)
  };

  const [index, setIndex] = useState<number>(0);
  // const [showDialog, setShowDialog] = useState<boolean>(true);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const handleClose = () => setShowDialog(false);

  const handlePrevious = () => {
    setIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setIndex(prev => Math.min(groups.length - 1, prev + 1));
  };

  const groups: ReactNode[] = [
    (
      <div key="#1" className="py-3">
        <h3 className="fs-3 mb-3 text-body">Meses com Mais Clipes</h3>
        <ListGroup as="ol" className="mb-3">
          {monthMoreClips.map((month, i) => (
            <ListGroup.Item key={i} as="li" className="d-flex justify-content-between align-items-center">
              <div className="ms-2 me-auto">
                <div className="fw-bold">{month[0] || '...'}</div>
              </div>
              <Badge bg="info" pill className={"border-0 fs-5"}>
                {month[1].toLocaleString('pt-br')} clipes
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Alert variant="info">
          <p className="mb-1">Totalizando</p>
          <h4 className="alert-heading mb-1">{totalClips.toLocaleString('pt-br')} clipes</h4>
          <p className="mb-0">feitos no ano de {currentYear}.</p>
        </Alert>
      </div>
    ),
    (
      <div key="#2" className="py-3">
        <h3 className="fs-3 mb-3 text-body">Top {topClippers.length} Clippers</h3>
        <ListGroup as="ol">
          {topClippers.map((clipper, i) => (
            <ListGroup.Item key={i} as="li" className="d-flex justify-content-between align-items-center">
              <div className="ms-2 me-auto">
                <div className="fw-bold">{clipper[0] || '...'}</div>
              </div>
              <Badge bg="success" pill className={"border-0 fs-5"}>
                {clipper[1].toLocaleString('pt-br')} clipes
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    ),
    (
      <div key="#3" className="py-3">
        <h3 className="fs-3 mb-3 text-body">Visualizações</h3>
        <Alert variant="warning" className="text-center">
          <p className="mb-2">Todos os clipes feitos em</p>
          <h2 className="alert-heading mb-2">{currentYear}</h2>
          <p className="mb-1">tiveram juntos</p>
          <h3 className="alert-heading mb-1">{totalViews.toLocaleString('pt-br')}</h3>
          <p className="mb-0">visualizações.</p>
        </Alert>
      </div>
    ),
    (
      <div key="#4" className="py-3">
        <h3 className="fs-3 mb-3 text-body">
          Os {topClips.length} clipes mais vistos feitos no ano de {currentYear}
        </h3>
        <ListGroup as="ol" className={"m-0 p-0"}>
          {topClips.map((clip, i) => (
            <ListGroup.Item key={i} as="li">
              <a
                href={clip.url || '#'}
                target={targetExternalLink}
                rel="noopener noreferrer"
                className="text-decoration-none "
                title={Util.capitalizeText(clip.title || "Título não retornado")}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold text-truncate" style={{ maxWidth: '300px' }}>
                      {clip.title.length > 30 ? `${clip.title.slice(0, 30)}...` : clip.title || 'Título não retornado'}
                    </div>
                  </div>
                  <Badge bg="danger" pill className={"border-0 fs-5"}>
                    {clip.view_count.toLocaleString('pt-br')} views
                  </Badge>
                </div>
              </a>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    )
  ];

  return (
    <Dialog show={showDialog} onHide={handleClose}>
      <div className="d-flex flex-column">
        <div className="flex-grow-1 overflow-auto">
          <AnimationPresence date={new Date()}>
            {groups[index]}
          </AnimationPresence>
        </div>

        <div className="pt-3">
          <div className="border-top pt-4 d-flex justify-content-between align-items-center mb-3">
            <small className="text-muted">
              {String(index + 1).padStart(2, '0')}
              <span style={{fontFamily: "Arial, sans-serif"}}>/</span>
              {String(groups.length).padStart(2, '0')}
            </small>
          </div>

          <div className="d-flex gap-2 mb-3">
            <Button
              variant="primary"
              onClick={handlePrevious}
              // disabled={index === 0}
              className="flex-fill text-small"
              style={index === 0 ? {cursor: "not-allowed", opacity: 0.5} : {}}
            >
              Anterior
            </Button>
            <Button
              variant="primary"
              onClick={handleNext}
              // disabled={index === groups.length - 1}
              className="flex-fill"
              style={index === groups.length - 1 ? {cursor: "not-allowed", opacity: 0.5} : {}}
            >
              Próximo
            </Button>
          </div>

          <Alert variant="secondary" className="text-center text-small">
            <span>Dados obtidos utilizando a API da Twitch.</span>
          </Alert>
        </div>
      </div>
    </Dialog>
  );
};

export default StatisticDialog;
