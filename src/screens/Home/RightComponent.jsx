import React, { useContext } from 'react'
import styled from 'styled-components'
import { IoTrashOutline } from 'react-icons/io5'
import { BiEditAlt } from 'react-icons/bi'
import { FcOpenedFolder } from 'react-icons/fc'
import logo from '../../assets/logo-small.png'
import { ModalContext } from '../../context/ModalContext'
import { PlaygroundContext } from '../../context/PlaygroundContext'
import { useNavigate } from 'react-router-dom'

const StyledRightComponent = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`

const Heading = styled.h2`
  font-size: 1.8rem;
  color: #2c3e50;
`

const AddButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #2ecc71;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #27ae60;
  }
`

const FolderCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  padding: 1rem;
`

const FolderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const FolderTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  color: #34495e;
`

const FolderIcons = styled.div`
  display: flex;
  gap: 1rem;
`

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: #7f8c8d;
  transition: color 0.2s;

  &:hover {
    color: #34495e;
  }
`

const PlayGroundCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`

const Card = styled.div`
  background-color: #ecf0f1;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`

const CardContent = styled.div`
  flex: 1;
`

const CardTitle = styled.h4`
  margin: 0;
  color: #2c3e50;
`

const CardLanguage = styled.p`
  margin: 0.5rem 0 0;
  color: #7f8c8d;
`

const Logo = styled.img`
  width: 40px;
  margin-bottom: 0.5rem;
`

const RightComponent = () => {
  const navigate = useNavigate();

  const { openModal } = useContext(ModalContext);
  const { folders, deleteFolder, deleteCard } = useContext(PlaygroundContext);

  return (
    <StyledRightComponent>
      <Header>
        <Heading>
          My <span>Playground</span>
        </Heading>
        <AddButton onClick={() => openModal({
          show: true,
          modalType: 1,
          identifiers: {
            folderId: "",
            cardId: "",
          }
        })}> + New Folder</AddButton>
      </Header>

      {
        Object.entries(folders).map(([folderId, folder]) => (
          <FolderCard key={folderId}>
            <FolderHeader>
              <FolderTitle>
                <FcOpenedFolder /> {folder.title}
              </FolderTitle>
              <FolderIcons>
                <IconButton onClick={() => deleteFolder(folderId)}><IoTrashOutline /></IconButton>
                <IconButton onClick={() => openModal({
                  show: true,
                  modalType: 4,
                  identifiers: {
                    folderId: folderId,
                    cardId: "",
                  }
                })}><BiEditAlt /></IconButton>
                <AddButton onClick={() => openModal({
                  show: true,
                  modalType: 2,
                  identifiers: {
                    folderId: folderId,
                    cardId: "",
                  }
                })}>+ New Playground</AddButton>
              </FolderIcons>
            </FolderHeader>

            <PlayGroundCards>
              {
                Object.entries(folder['playgrounds']).map(([playgroundId, playground]) => (
                  <Card key={playgroundId} onClick={() => {
                    navigate(`/playground/${folderId}/${playgroundId}`)
                  }}>
                    <Logo src={logo} />
                    <CardContent>
                      <CardTitle>{playground.title}</CardTitle>
                      <CardLanguage>Language: {playground.language}</CardLanguage>
                    </CardContent>
                    <FolderIcons onClick={(e) => {
                      e.stopPropagation(); //stop click propagation from child to parent
                    }}>
                      <IconButton onClick={() => deleteCard(folderId, playgroundId)}><IoTrashOutline /></IconButton>
                      <IconButton onClick={() => openModal({
                        show: true,
                        modalType: 5,
                        identifiers: {
                          folderId: folderId,
                          cardId: playgroundId,
                        }
                      })}><BiEditAlt /></IconButton>
                    </FolderIcons>
                  </Card>
                ))
              }
            </PlayGroundCards>
          </FolderCard>
        ))
      }
    </StyledRightComponent>
  )
}

export default RightComponent;