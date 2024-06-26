const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MovieNotesController
{

  async create(request, response) {
    const {title, description, rating, tags} = request.body;
    const user_id = request.user.id;

    if (rating > 5 || rating <= 0) {
      throw new AppError("A nota deve ser entre 1 a 5");
    }


    const [note_id] = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id
    });

    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      }
    });

    await knex("movie_tags").insert(tagsInsert);

    return response.json();
  }

  async show(request, response) {
    const {id} = request.params;

    const note = await knex("movie_notes").where({id}).first();
    const tags = await knex("movie_tags").where({note_id: id}).orderBy("name");

    return response.json({
      ...note,
      tags
    });
  }

  async update(request, response) {
    const {title, description, rating, tags} = request.body;
    const  note_id = request.params;

    console.log(note_id);

    const note = await knex('movie_notes').select('*').where(note_id).first();
    await knex('movie_tags').where('note_id', note_id.id).delete();

    note.title = title ??  note.title;
    note.description = description ?? note.description;
    note.rating = rating ?? note.rating;
    const user_id = note.user_id;

    console.log(user_id);

    const noteUpdate = {
      title: note.title,
      description: note.description,
      rating: note.rating,
      updated_at: knex.fn.now()
    };


    await knex('movie_notes').where(note_id).update(noteUpdate);

    const tagsInsert = tags.map(name => {
      return {
        note_id: note_id.id,
        name,
        user_id
      }
    });

    console.log(tagsInsert);

    await knex("movie_tags").insert(tagsInsert);


    return response.status(200).json();

  }

  async delete(request, response) {

    const {id} = request.params;

    await knex("movie_notes").where({id}).delete();

    return response.json();
  }

  async index(request, response) {
    const { title, tags } = request.query;
    const user_id = request.user.id;

    let notes;

    if (tags) {
      const filterTags = tags.split(',').map(tag => tag.trim());

      notes = await knex("movie_tags").select(["movie_notes.id", "movie_notes.title", "movie_notes.user_id"])
      .where("movie_notes.user_id", user_id)
      .whereLike("movie_notes.title",`%${title}%`)
      .whereIn("name", filterTags)
      .innerJoin("movie_notes", "movie_notes.id", "movie_tags.note_id")
      .orderBy("movie_notes.title");

    } else {
      notes = await knex("movie_notes").where({user_id}).whereLike("title", `%${title}%`).orderBy("title");
    }

    const userTags = await knex("movie_tags").where({user_id});
    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id);

      return {
        ...note,
        tags: noteTags
      }
    });

    return response.json(notesWithTags);
  }
}

module.exports = MovieNotesController;