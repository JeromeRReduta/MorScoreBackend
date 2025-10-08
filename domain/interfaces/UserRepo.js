import Interface from "./Interface.js";
import User from "../accounts/User.js";

/**
 * Repository pattern for stored user info
 */
export default class UserRepo extends Interface {
  constructor() {
    super();
  }

  /**
   * Gets all users
   * @returns {User[]} all users
   */
  async getAllAsync() {}

  /**
   * Gets a user with a given id
   * @param {Number} id
   * @returns {User | null} user with a given id, or null
   */
  async getByIdAsync(id) {}

  /**
   * Gets a user with the given email and password
   * @param {String} email email
   * @param {String} password password
   * @returns {User | null} user with the given email and password, or null if no match
   */
  async getByLoginInfoAsync({ loginInfo: { email, password } }) {}

  /**
   * Adds a user to the db
   * @param {String} email email
   * @param {String} name name
   * @param {String} password password, to be hashed in backend
   * @returns {User} the new user
   */
  async createAsync({ email, name, password }) {}

  /**
   * Deletes a user from the db w/ the given id
   * @param {Number} id id
   * @returns {User | null} the deleted user, or user exists w/ this id
   */
  async deleteByIdAsync(id) {}

  /**
   * ...I plead the 5th. Inspired by {@link https://x.com/hakanshehu/status/1943019056610558432|this}
   *
   * @param {String} password password
   * @returns {User | null} User w/ the given password or null if it doesn't exist
   */
  async getByPasswordAsync(password) {}
}
