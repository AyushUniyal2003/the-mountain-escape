import supabase, { supabaseUrl } from "./supabase";

// Get all cabins
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

// Add or Edit Cabin
export async function addEditCabins(newCabin, id) {
  const isEditing = !!id;
  let imageName, imagePath;

  // Handle Image Path
  if (newCabin.image && typeof newCabin.image !== "string") {
    imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  } else {
    imageName = newCabin.image;
    imagePath = newCabin.image?.startsWith(supabaseUrl) ? newCabin.image : null;
  }

  let query = supabase.from("cabins");

  // FOR NEW CABIN
  if (!isEditing) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // FOR EDITING
  if (isEditing) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be added");
  }
  
  if (typeof newCabin.image !== "string") {
    // Upload image if it's a file and not a string path
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    // DELETE CABIN IF ANY ERROR IN UPLOADING IMAGE
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.error(storageError);
      throw new Error("Cabin Image could not be uploaded");
    }
  }

  return data;
}

// Delete cabin
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}