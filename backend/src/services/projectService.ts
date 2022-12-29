import { Project } from "../entities/Project";
import { AppDataSource } from "../utils/dataSource";
import { UpdateProjectInput } from "../utils/interfaces";

const projectRepository = AppDataSource.getRepository(Project);

export const getProjects = async () => {
    return await projectRepository.find({relations: {user: true}});
}

export const saveNewProject = async (projectInfo: Project) => {
    return await projectRepository.save(projectInfo);
}

export const findProjectByIdWithUser = async (id: string) => {
    return await projectRepository.find({relations: {user: true}, where: { id }});
}

export const findProjectById = async(id: string) => {
    return await projectRepository.findOneBy({ id });
}

export const deleteProjectById = async (id: string) => {
    return await projectRepository.delete({ id });
}

export const updateProjectById = async (id: string, projectInfo: UpdateProjectInput) => {
    return await projectRepository.update({ id }, projectInfo);
}