interface ParentResourceResponse {
  id: number;
  resourceName: string;
  parent: ParentResourceResponse;
}

interface ChildrenResourceResponse {
  id: number;
  resourceName: string;
  url: string | null;
  extension: string | null;
  resourceType: string;
}

interface FolderResourceResponse {
  id: number;
  resourceName: string;
  parent: ParentResourceResponse;
  children: ChildrenResourceResponse[];
}
