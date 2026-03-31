import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

export async function fetchAllClasses() {
  return client.fetch(`
    *[_type == "class"]{
      _id,
      title,
      description,
      duration_minutes,
      level,
      resources,
      video_link,
      unidad,
      semestre,
      duration,
      class_name,
      type,
      recursos,
      closing,
      "tags": tags[]->{ "name": name.current, label },
      "main_tag": main_tag->{ "name": name.current, label, color },
      "images": images[]{ "url": asset->url },
      "files": files[]{ "url": asset->url, "name": asset->originalFilename }
    }
  `)
}

export async function fetchClassById(id) {
  return client.fetch(`
    *[_type == "class" && _id == $id][0]{
      _id,
      title,
      description,
      duration_minutes,
      level,
      resources,
      materials,
      video_link,
      unidad,
      semestre,
      duration,
      class_name,
      type,
      recursos,
      closing,
      "tags": tags[]->{ "name": name.current, label },
      "main_tag": main_tag->{ "name": name.current, label, color },
      "images": images[]{ "url": asset->url },
      "files": files[]{ "url": asset->url, "name": asset->originalFilename }
    }
  `, { id })
}

export async function fetchAllCourses() {
  return client.fetch(`
    *[_type == "course"]{
      _id,
      title,
      description,
      "tags": tags[]->{ "name": name.current, label },
      "classes": classes[]->{
        _id,
        title,
        description,
        duration_minutes,
        level,
        "tags": tags[]->{ "name": name.current, label }
      }
    }
  `)
}
