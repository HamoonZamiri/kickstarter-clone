import { Project } from "../entities/Project";
import { AppDataSource } from "../utils/dataSource";
import { CreateProjectInput } from "../utils/interfaces";

const projectRepository = AppDataSource.getRepository(Project);

export const getProjects = async () => {
    return await projectRepository.find();
}

export const saveNewProject = async (projectInfo: CreateProjectInput) => {
    return await projectRepository.save(projectRepository.create(projectInfo));
}

export const findProjectById = async (id: string) => {
    return await projectRepository.findOneBy({ id });
}

export const deleteProjectById = async (id: string) => {
    return await projectRepository.delete({ id });
}

export const updateProjectById = async (id: string, projectInfo: CreateProjectInput) => {
    return await projectRepository.update({ id }, projectInfo);
}