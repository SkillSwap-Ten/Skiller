'use client';
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavLink from "../../../atoms/links/NavLinks";
import SkillTagTinyList from "../../../atoms/tags/SkillTagTiny";
import { ITableRowUserProps } from "../../../../types/organisms/table.type";
import { FaLinkedin } from "react-icons/fa6";
import { FaBehanceSquare, FaGithubSquare } from "react-icons/fa";
import { validateImageUrl } from "@/src/lib/utils/imageValidator";

const Td = styled.td`
  padding: 10px;
  border: none;
  text-align: start;
  text-transform: capitalize;
  font-size: 15px;
  
  .active{
    color: ${({ theme }) => theme.colors.textGreen};
    border: 1px solid ${({ theme }) => theme.colors.textGreen};
  }

  .inactive{
    color: ${({ theme }) => theme.colors.textRed};
    border: 1px solid ${({ theme }) => theme.colors.textRed};
  }

  .suspended{
    color: ${({ theme }) => theme.colors.textGray};
    border: 1px solid ${({ theme }) => theme.colors.textGray};
  }

  .role{
    color: ${({ theme }) => theme.colors.textGray};
    border: 1px solid ${({ theme }) => theme.colors.textGray};
  }
`;

const Tr = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.textDark};
  
  &:hover {
    background-color: #eee;
  }
`;

const TableTag = styled.div`
    width: max-content;
    padding: 5px 10px;
    border-radius: 10px;
    text-align: center;
    font-size: 10px;
    font-weight: bold;
`;

const EditButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 1px solid orange;
  margin: 5px;
  color: orange;
  border-radius: 10px;
  padding: 5px 10px;
  transition: 0.4s ease;

  &:hover {
    transition: 0.4s ease;
    background-color: orange;
    color: ${({ theme }) => theme.colors.textWhite};
  }
`;

const DeleteButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 1px solid red;
  margin: 5px;
  color: red;
  border-radius: 10px;
  padding: 5px 10px;
  transition: 0.4s ease;

  &:hover {
    transition: 0.4s ease;
    background-color: red;
    color: ${({ theme }) => theme.colors.textWhite};
  }
`;

const ReportButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 1px solid grey;
  margin: 5px;
  color: grey;
  border-radius: 10px;
  padding: 5px 10px;
  transition: 0.4s ease;

  &:hover {
    transition: 0.4s ease;
    background-color: grey;
    color: ${({ theme }) => theme.colors.textWhite};
  }
`;

const UserMainInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserMainInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SocialButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .disabled-social-link {
    opacity: 0.5;
    background-color: ${({ theme }) => theme.colors.bgTertiary};
    pointer-events: none;
  }
`;

const SocialButton = styled.div`
  border-radius: 5px;
  padding: 0.3rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.textDark};
  font-weight: 500;
  word-wrap: break-word;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textBlack};

  a {
    padding: 0;
    color: ${({ theme }) => theme.colors.textBlack};
    font-size: 0.9rem
  }
`;

const Avatar = styled.div<{ urlImage: string }>`
  border: 1px solid ${({ theme }) => theme.colors.textDark};
  background-image: url(${(props) => props.urlImage}); 
  background-size: cover;
  background-position: center;
  width: 4rem;
  height: 4rem;
  border-radius: 10px;
  display: flex;
`;

const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 60%;
  padding-bottom: 0 !important;

  & p{
    color: ${({ theme }) => theme.colors.textOrange};
  }
`;


const TableRowUser: React.FC<ITableRowUserProps> = ({
  user,
  setDataToEdit,
  setDataToReport,
  onDeleteData,
}) => {
  const [imageUrl, setImageUrl] = useState<string>("/img/default-picture-full.webp");
  const {
    id,
    name,
    lastName,
    abilities,
    category,
    idStateUser,
    nameStateUser,
    idRoleUser,
    urlImage,
    jobTitle,
    roleName,
    urlBehance,
    urlGithub,
    urlLinkedin,
    suspensionDate,
    reactivationDate,
  } = user;

  useEffect(() => {
    const checkImageUrl = (url: string) => {
      const img = new Image();
      img.src = url;
      img.onerror = () => {
        // Si la imagen da error, se usa la imagen por defecto
        setImageUrl("/img/default-picture-full.webp");
      };
      img.onload = () => {
        // Si la imagen carga correctamente, se usa la URL
        setImageUrl(url);
      };
    };

    if (urlImage && validateImageUrl(urlImage)) {
      checkImageUrl(urlImage);
    } else {
      setImageUrl("/img/default-picture-full.webp");
    }
  }, [urlImage]);

  console.log(nameStateUser);

  let stateElement;
  if (nameStateUser?.toLocaleLowerCase().trim() === 'activo') {
    stateElement = <TableTag className={'active'}>{idStateUser}: {nameStateUser}</TableTag>;
  } else if (nameStateUser?.toLocaleLowerCase().trim() === 'inactivo') {
    stateElement = <TableTag className={'inactive'}>{idStateUser}: {nameStateUser}</TableTag>;
  } else {
    stateElement = <TableTag className={'suspended'}>{idStateUser}: {nameStateUser}</TableTag>;
  }

  // Constante que convierte abilities de string a array
  const abilitiesArray =
    typeof abilities === 'string'
      ? abilities.split(',').map((ability: string) => ability.trim())
      : [];

  return (
    <Tr>
      <Td>{id}</Td>
      <Td>
        <UserMainInfoContainer>
          <Avatar urlImage={imageUrl} />
          <UserMainInfo>
            {name} {lastName}
            <TableTag className={'role'}>{idRoleUser}: {roleName}</TableTag>
          </UserMainInfo>
        </UserMainInfoContainer>
      </Td>
      <Td>{jobTitle}</Td>
      <Td>
        <Skills>
          <SkillTagTinyList skillsArray={abilitiesArray.slice(0, 3)} />
          <p>...</p>
        </Skills>
      </Td>
      <Td>{category}</Td>
      <Td>{stateElement}</Td>
      <Td>{suspensionDate || "N/A"}</Td>
      <Td>{reactivationDate || "N/A"}</Td>
      <Td>
        <SocialButtons>
          <SocialButton
            className={urlLinkedin ? "" : "disabled-social-link"}
          >
            <FaLinkedin />
            <NavLink
              target="_blank"
              hover={{ fontWeight: '700', transition: '0.4s'}}
              href={urlLinkedin ? urlLinkedin : "#"}
              label="LinkedIn"
            />
          </SocialButton>

          <SocialButton
            className={urlGithub ? "" : "disabled-social-link"}
          >
            <FaGithubSquare />
            <NavLink
              target="_blank"
              hover={{ fontWeight: '700', transition: '0.4s'}}
              href={urlGithub ? urlGithub : "#"}
              label="GitHub"
            />
          </SocialButton>

          <SocialButton
            className={urlBehance ? "" : "disabled-social-link"}
          >
            <FaBehanceSquare />
            <NavLink
              target="_blank"
              hover={{ fontWeight: '700', transition: '0.4s'}}
              href={urlBehance ? urlBehance : "#"}
              label="Behance"
            />
          </SocialButton>
        </SocialButtons>
      </Td>
      <Td>
        <EditButton onClick={() => setDataToEdit(user)}>Editar</EditButton>
        <ReportButton
          onClick={() =>
            setDataToReport({
              fullName: `${user.name} ${user.lastName}`,
              id: user.id ?? 0,
            })
          }
        >
          Reportar
        </ReportButton>
        <DeleteButton onClick={() => onDeleteData(user.id!)}>Eliminar</DeleteButton>
      </Td>
    </Tr>
  );
};

export default TableRowUser;


